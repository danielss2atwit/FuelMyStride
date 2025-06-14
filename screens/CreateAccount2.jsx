import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView,Platform,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateAccount2 = () => {
  const navigation = useNavigation();
  
  const [selectedDiets, setSelectedDiets] = useState([]);
const [otherDiet, setOtherDiet] = useState('');
const [showOtherInput, setShowOtherInput] = useState(false);

const toggleDiet = (diet) => {
  if (diet === 'Other') {
    setShowOtherInput(!showOtherInput);
    return;
  }

  setSelectedDiets((prev) =>
    prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
  );
};

   const [selectedGender, setSelectedGender] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const genders = ['Female', 'Male', 'Other'];
  const activities = ['Beginner (0-3 days)', 'Intermediate (4-6 days)', 'Advanced (7 days)'];
  const goals = ['Shorter Race (<10k)', 'Longer Race (>10k)', 'General Fitness'];

  return (
    <ImageBackground source={require('../assets/track.jpg')} style={styles.background}
    blurRadius={5}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
      keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      
        

        <Text style={styles.label}>Gender</Text>
      <View style={styles.optionsRow}>
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.optionButton,
                selectedGender === gender && styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text style={styles.optionButtonText}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Activity Level</Text>
         <View style={styles.optionsColumn}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity}
              style={[
                styles.optionButton,
                selectedActivity === activity && styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedActivity(activity)}
            >
              <Text style={styles.optionButtonText}>{activity}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Dietary Preferences</Text>
<View style={styles.optionsRow}>
  {['Vegan', 'Vegetarian', 'Pescatarian', 'Omnivore', 'Gluten-Free', 'Dairy-Free', 'Other'].map((diet) => (
    <TouchableOpacity
      key={diet}
      style={[
        styles.optionButton,
        selectedDiets.includes(diet) || (diet === 'Other' && showOtherInput)
          ? styles.selectedOptionButton
          : null,
      ]}
      onPress={() => toggleDiet(diet)}
    >
      <Text style={styles.optionButtonText}>{diet}</Text>
    </TouchableOpacity>
  ))}
</View>

{showOtherInput && (
  <TextInput
    style={styles.input}
    placeholder="Please specify..."
    value={otherDiet}
    onChangeText={setOtherDiet}
  />
)}

        <Text style={styles.label}>Training Goal</Text>
         <View style={styles.optionsRow}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.optionButton,
                selectedGoal === goal && styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              <Text style={styles.optionButtonText}>{goal}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateAccount2;

const styles = StyleSheet.create({
 background: { flex: 1, justifyContent: 'center' },
  container: { padding: 20,paddingBottom:40, marginTop:50, },
  label: { fontWeight: 'bold', color: '#4B0082', marginTop: 15 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    
  },
  optionsColumn: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff', 
  },
  selectedOptionButton: {
    borderColor: '#4B0082', // purple outline
    borderWidth: 2,
  },
  optionButtonText: {
    color: '#4B0082',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4B0082',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});