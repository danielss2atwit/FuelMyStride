import {
  ScrollView,
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

function WorkoutInput({ data, updateField }) {
  const tags = ['Easy', 'Moderate', 'Hard'];
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const [durationPicker, setDurationPicker] = useState({ type: null, visible: false });
  const [pacePicker, setPacePicker] = useState({ type: null, visible: false });
  const [distancePicker, setDistancePicker] = useState({ type: null, visible: false });

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirm = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    updateField('time', formattedTime ); // ✅ Corrected syntax
    hideTimePicker();
  };

  const handleDurationSelect = (type, value) => {
    updateField('duration', {
      ...data.duration,
      [type]: value,
    });
    setDurationPicker({ type: null, visible: false });
  };

  const handlePaceSelect = (type, value) => {
    updateField('pace', {
      ...data.pace,
      [type]: value,
    });
    setPacePicker({ type: null, visible: false });
  };

  const handleDistanceSelect = (type, value) => {
    updateField('distance', {
      ...data.distance,
      [type]: value,
    });
    setDistancePicker({ type: null, visible: false });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Workout Intensity</Text>
        <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
          <Text style={styles.infoIcon}>ℹ️</Text>
        </TouchableOpacity>
      </View>

      {showTooltip && (
        <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              Workout Intensity Guide:{'\n\n'}
              • Easy: Light effort, comfortable pace — you can chat while exercising. Good for recovery or warm-ups.{'\n\n'}
              • Moderate: Steady effort, noticeable increase in breathing and heart rate, but sustainable.{'\n\n'}
              • Hard: High effort, challenging pace — you’re pushing yourself and can only speak in short phrases.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updateField('selectedTag', tag)}
            style={[
              styles.tag,
              data.selectedTag === tag && styles.selectedTag,
            ]}
          >
            <Text
              style={[
                styles.tagText,
                data.selectedTag === tag && styles.selectedTagText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Start Time</Text>
        <TouchableOpacity style={styles.inputBox} onPress={showTimePicker}>
          <Text style={{ color: data.time ? '#000' : '#aaa' }}>
            {data.time || 'Select a time'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Duration</Text>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
          {['hours', 'minutes', 'seconds'].map((type) => {
            const val = data.duration[type] || '0';
            const label = type === 'hours' ? 'h' : type === 'minutes' ? 'm' : 's';

            return (
              <TouchableOpacity
                key={type}
                style={styles.durationBox}
                onPress={() => setDurationPicker({ type, visible: true })}
              >
                <Text style={{ color: '#000' }}>{`${val} ${label}`}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Distance</Text>
        {['whole', 'decimal', 'unit'].map((type) => (
          <TouchableOpacity key={type} style={styles.inputBox} onPress={() => setDistancePicker({ type, visible: true })}>
            <Text>
              {type === 'decimal' ? '.' : ''}
              {data.distance[type] || (type === 'unit' ? 'mi' : '0')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Pace</Text>
        {['minutes', 'seconds', 'unit'].map((type) => (
          <TouchableOpacity key={type} style={styles.inputBox} onPress={() => setPacePicker({ type, visible: true })}>
            <Text>
              {data.pace[type] || '0'} {type === 'unit' ? '' : type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Shared Modal Logic for all pickers */}
      {durationPicker.visible && (
        <TouchableWithoutFeedback onPress={() => setDurationPicker({type: null, visible:false})}>
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            {[...Array(durationPicker.type === 'hours' ? 12 : 60).keys()].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.modalItem}
                onPress={() => handleDurationSelect(durationPicker.type, num.toString())}
              >
                <Text>{num}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setDurationPicker({ type: null, visible: false })}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        </TouchableWithoutFeedback>
      )}

      {pacePicker.visible && (
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            {pacePicker.type === 'unit'
              ? ['mi', 'km'].map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={styles.modalItem}
                    onPress={() => handlePaceSelect(pacePicker.type, unit)}
                  >
                    <Text>{unit}</Text>
                  </TouchableOpacity>
                ))
              : [...Array(pacePicker.type === 'minutes' ? 30 : 60).keys()].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.modalItem}
                    onPress={() => handlePaceSelect(pacePicker.type, num.toString())}
                  >
                    <Text>{num}</Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      )}

      {distancePicker.visible && (
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            {distancePicker.type === 'unit'
              ? ['mi', 'km'].map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={styles.modalItem}
                    onPress={() => handleDistanceSelect(distancePicker.type, unit)}
                  >
                    <Text>{unit}</Text>
                  </TouchableOpacity>
                ))
              : [...Array(distancePicker.type === 'whole' ? 100 : 10).keys()].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.modalItem}
                    onPress={() => handleDistanceSelect(distancePicker.type, num.toString())}
                  >
                    <Text>{distancePicker.type === 'decimal' ? `.${num}` : num}</Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
 container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedTag: {
    backgroundColor: '#822f88',
    borderColor: '#822f88',
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTagText: {
    color: 'white',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    width: 100,
    backgroundColor: '#822f88',
    color: 'white',
    padding: 8,
    textAlign: 'center',
    marginRight: 10,
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'white',
    height: 35,
    paddingHorizontal: 8,
    paddingTop:10,
    
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom:10,
},
infoIcon: {
  marginLeft: 6,
  fontSize: 14,
  color: '#333',
  marginBottom:6,
},
tooltip: {
  backgroundColor: '#fff',
  borderColor: '#ccc',
  borderWidth: 1,
  padding: 8,
  borderRadius: 6,
  marginVertical: 6,
  maxWidth: 280,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
tooltipText: {
  fontSize: 13,
  color: '#333',
},
durationBox: {
  backgroundColor: 'white',
  borderColor: '#333',
  borderWidth: 1,
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginHorizontal: 4,
  flex: 1,
  alignItems: 'center',
},

modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
modalContent: {
  backgroundColor: '#fff',
  width: 200,
  maxHeight: 300,
  borderRadius: 10,
  paddingVertical: 10,
},
modalItem: {
  padding: 12,
  alignItems: 'center',
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
},
});


export default WorkoutInput;