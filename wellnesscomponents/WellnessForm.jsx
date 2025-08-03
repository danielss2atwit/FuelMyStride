import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Rating } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



function WellnessForm(){

    const [sleepHours, setSleepHours] = useState('8');
  const [sleepQuality, setSleepQuality] = useState(3);
  const [hydration, setHydration] = useState(0);
  const [soreness, setSoreness] = useState(0);
  const [mood, setMood] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [notes, setNotes] = useState('');
  const [illnessInjury, setIllnessInjury] = useState(false);
  const [menstrualCycle, setMenstrualCycle] = useState(false);

  const moodOptions = ['😃', '🙂', '😐', '😕', '😡'];

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const wellnessEntry = {
      date: today,
      sleepHours,
      sleepQuality,
      hydration,
      soreness,
      mood,
      energyLevel,
      notes,
      illnessInjury,
      menstrualCycle,
    };

    try {
      const existingData = await AsyncStorage.getItem('wellnessLogs');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      const updatedData = [...parsedData.filter(entry => entry.date !== today), wellnessEntry];

      await AsyncStorage.setItem('wellnessLogs', JSON.stringify(updatedData));

         // ✅ Clear form
    setSleepHours('');
    setSleepQuality(3);
    setHydration('');
    setSoreness('');
    setMood(null);
    setEnergyLevel(null);
    setNotes('');
    setIllnessInjury(false);
    setMenstrualCycle(false);

      Alert.alert('Saved', 'Wellness data saved successfully.');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save wellness data.');
    }
  };

    return(
        <ScrollView contentContainerStyle={styles.container}>
      

     {/* Sleep Hours */}
      <Text style={styles.label}>Sleep (hours)</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={sleepHours}
        onChangeText={setSleepHours}
        placeholder="e.g. 8"
      />

      {/* Sleep Quality */}
      <Text style={styles.label}>Sleep Quality</Text>
      <Rating
        imageSize={50}
        startingValue={sleepQuality}
        onFinishRating={setSleepQuality}
        ratingBackgroundColor="#E6F0FA"
        style={styles.rating}
      />

      {/* Hydration */}
      <Text style={styles.label}>Hydration (oz)</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={hydration.toString()}
        onChangeText={(text) => setHydration(Number(text))}
      />

      {/* Soreness */}
      <Text style={styles.label}>Soreness (0 = fresh, 10 = very sore)</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={soreness.toString()}
        onChangeText={(text) => setSoreness(Number(text))}
      />

      {/* Mood */}
      <Text style={styles.label}>Mood</Text>
      <View style={styles.moodContainer}>
        {moodOptions.map((m, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setMood(m)}
            style={[styles.moodButton, mood === m && styles.moodSelected]}
          >
            <Text style={styles.moodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Energy Level */}
      <Text style={styles.label}>Energy Level</Text>
      <View style={styles.energyContainer}>
        {['Low', 'Okay', 'High'].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setEnergyLevel(level)}
            style={[styles.energyButton, energyLevel === level && styles.energySelected]}
          >
            <Text>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Anything else you want to note?"
      />

      {/* Illness/Injury */}
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Illness/Injury?</Text>
        <Switch
          value={illnessInjury}
          onValueChange={setIllnessInjury}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={illnessInjury ? '#005BBB' : '#f4f3f4'}
        />
      </View>

      {/* Menstrual Cycle */}
      <View style={styles.toggleRow}>
        <Text style={styles.label}>Menstrual Cycle?</Text>
        <Switch
          value={menstrualCycle}
          onValueChange={setMenstrualCycle}
          trackColor={{ false: '#ccc', true: '#007AFF' }}
          thumbColor={menstrualCycle ? '#005BBB' : '#f4f3f4'}
        />
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    );
}

export default WellnessForm


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E6F0FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#003366',
    marginVertical: 8,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  moodButton: {
    padding: 10,
    borderRadius: 8,
  },
  moodSelected: {
    backgroundColor: '#A7C7E7',
  },
  moodText: {
    fontSize: 24,
  },
  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  energyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D9EFFF',
    marginHorizontal: 5,
  },
  energySelected: {
    backgroundColor: '#007AFF',
    borderColor: '#005BBB',
    borderWidth: 1,
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  submitButton: {
    backgroundColor: '#005BBB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});