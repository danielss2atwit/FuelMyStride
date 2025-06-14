import React, {useState} from 'react';
import { View, Text, Switch, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetReminders = () => {
  const navigation = useNavigation();
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Set Daily Reminders</Text>
    <View style={styles.row}>
        <Text style={styles.label}>Enable Reminders</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      {enabled && (
        <>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.input}>Reminder Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={(_, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </>
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Reminders</Text>
      </TouchableOpacity>



  </View>
  );
};

export default SetReminders;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fef1de',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop:50,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize:12,
  },
   row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 15,
  },
  button: {
    backgroundColor: '#6e3b6e', padding: 15, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  header:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20,
  }
  
});
