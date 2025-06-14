import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddRaceGoal = () => {
  const navigation = useNavigation();
  const [name,setName]=useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>


    <Text style={styles.header}>Add Race/Goal</Text>  

    <Text style={styles.label}>Race/Goal Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Distance</Text>
      <TextInput style={styles.input} value={distance} onChangeText={setDistance} />

      <Text style={styles.label}>Target Date</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.input}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={(_, selectedDate) => {
          setShowPicker(false);
          if (selectedDate) setDate(selectedDate);
        }} />
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </TouchableOpacity>



  </View>
  );
};

export default AddRaceGoal;

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
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 2, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 15,backgroundColor:'white',
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

