import React, {useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UpdatePreferences = () => {
  const navigation = useNavigation();
  const [selectedDiet, setSelectedDiet] = useState('');
  const diets = ['Vegan', 'Vegetarian', 'Pescatarian', 'Omnivore', 'Gluten-Free', 'Dairy-Free','None']

   const renderOption = (option) => (
    <TouchableOpacity
      key={option}
      style={[styles.option, selectedDiet === option && styles.selected]}
      onPress={() => setSelectedDiet(option)}
    >
      <Text>{option}</Text>
    </TouchableOpacity>
  );

  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>




    <View style={styles.container}>
       <Text style={styles.header}>Update Preferences</Text> 
      <Text style={styles.label}>Dietary Preference</Text>
      <View style={styles.optionsContainer}>{diets.map(renderOption)}</View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>



  </View>
  );
};

export default UpdatePreferences;

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
  label: { fontSize: 16, marginBottom: 10 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 , },
  option: {
    padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 10,backgroundColor:'white',
  },
  selected: {
    borderColor: '#6e3b6e', backgroundColor: '#f3e5f5',
  },
  button: {
    backgroundColor: '#6e3b6e', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  header:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:20,
  }
});

  
  


