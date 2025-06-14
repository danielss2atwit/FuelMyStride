import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountInfo = () => {
  const navigation = useNavigation();

  const[name, setName]=useState('');
  const [username,setUsername] = useState('');
  const[email, setEmail] = useState('');
  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Account Info</Text>

    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>



  </View>
  );
};

export default AccountInfo;

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
    borderWidth: 2, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 15, backgroundColor:'white',
  },
  button: {
    backgroundColor: '#6e3b6e', padding: 15, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  header:{
    fontWeight: 'bold',
    fontSize:25,
  }
  
});
