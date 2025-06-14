import React, { useState } from 'react';
import FoodHeader from '../foodcomponents/FoodHeader';
import {Alert, ScrollView,Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Tags from '../foodcomponents/Tags'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { saveLog } from '../utils/storage';
import { AsyncStorage } from '@react-native-async-storage/async-storage';



function LogFood() {
  const readLogs = async () => {
  try {
    const storedLogs = await AsyncStorage.getItem('foodLogs');
    const logs = storedLogs ? JSON.parse(storedLogs) : [];
    console.log('All saved logs:', logs);
    Alert.alert('Logs read', `You have ${logs.length} saved logs. See console for details.`);
  } catch (error) {
    console.error('Error reading logs:', error);
  }
};

  const [description, setDescription] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];
  const feelings = ['Energized⚡️', 'Good 🙂', 'Tired 😴'];


  const [tags, setTags] = useState([]);
   const handleTagsChange = (newTags) => {
    setTags(newTags);
    // You can store this with meal data later
  };

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [time, setTime] = useState('');

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirm = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(formattedTime);
    hideTimePicker();
  };

  const [showTooltip, setShowTooltip] = useState(false);

  // The important function to handle submission
  const handleSubmit = async () => {
     console.log('Submitting log with:', { selectedMeal, time, selectedFeeling, tags, description });
    if (!selectedMeal) {
      Alert.alert('Please select a meal type.');
      return;
    }
    if (!time) {
      Alert.alert('Please select a time.');
      return;
    }
    if (!selectedFeeling) {
      Alert.alert('Please select how you felt after eating.');
      return;
    }

    const logEntry = {
      type: 'food',
      mealType: selectedMeal,
      time,
      feeling: selectedFeeling,
      tags,
      description,
      timestamp: new Date().toISOString(),
    };

    try {
      await saveLog(logEntry);
      Alert.alert('Success', 'Your food log has been saved!');
      
      // Optional: Reset form after submit
      setSelectedMeal(null);
      setTime('');
      setSelectedFeeling(null);
      setTags([]);
      setDescription('');
    } catch (error) {
      Alert.alert('Error', 'There was an error saving your log.');
      console.error('SaveLog error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
      <View style={styles.container}>
        <FoodHeader />

        {/* Meal Type */}
        <Text style={styles.label}>Meal</Text>
        <View style={styles.mealOptions}>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal}
              style={[
                styles.mealButton,
                selectedMeal === meal && styles.mealButtonSelected,
              ]}
              onPress={() => setSelectedMeal(meal)}
            >
              <Text style={styles.mealText}>{meal}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Input */}
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text style={{ color: time ? '#000' : '#aaa' }}>
          {time || 'Select a time'}
        </Text>
          </TouchableOpacity>
           <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />

        {/* Ideal Plate Recommendation */}
        <View style={styles.plateCard}>
          <Text style={styles.plateText}>
            🍽️ Ideal Plate: ⅓ Carbs | ⅓ Protein | ⅓ Color
          </Text>
          <Text style={styles.plateSubtext}>Based on your last workout</Text>
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Briefly describe what you ate..."
          value={description}
          onChangeText={setDescription}
        />

        {/*Tags */}
        <Tags onChangeTags={handleTagsChange}/>

        {/* How did you feel */}
        <View style={styles.row}>
        <Text style={styles.label}>How did you feel after eating?</Text>
        <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
      <Text style={styles.infoIcon}>ℹ️</Text>
       </TouchableOpacity>
      </View>

      {showTooltip && (
      <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
        <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>
        This helps us track how your meals relate to your energy. Choose the option that best reflects how you felt after eating.
      </Text>
      <TouchableOpacity style={styles.testButton} onPress={readLogs}>
  <Text style={styles.submitText}>Read Saved Logs (Test)</Text>
</TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
)}
        <View style={styles.feelingOptions}>
          {feelings.map((feeling) => (
            <TouchableOpacity
              key={feeling}
              style={[
                styles.feelingButton,
                selectedFeeling === feeling && styles.feelingButtonSelected,
              ]}
              onPress={() => setSelectedFeeling(feeling)}
            >
              <Text>{feeling}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LogFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2f0d2',
    padding: 10,
  },
  title: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 70,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  mealOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealButton: {
    backgroundColor: '#fff3b0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  mealButtonSelected: {
    borderColor: '#b8860b',
    borderWidth: 2,
  },
  mealText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  plateCard: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 6,
    marginVertical: 15,
  },
  plateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  plateSubtext: {
    fontSize: 12,
    color: '#555',
  },
  feelingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  feelingButton: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  feelingButtonSelected: {
    borderColor: '#b8860b',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: '#556b2f',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
},
infoIcon: {
  marginLeft: 6,
  fontSize: 16,
  color: '#333',
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
testButton: {
  backgroundColor: 'gray',
  padding: 10,
  marginVertical: 10,
  borderRadius: 5,
  alignItems: 'center',
},
});
