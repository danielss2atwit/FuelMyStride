import React, {useState} from 'react';
import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [ confirm, setConfirm] = useState('');
  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Change Password</Text>

     <Text style={styles.label}>Current Password</Text>
      <TextInput secureTextEntry style={styles.input} value={current} onChangeText={setCurrent} />

      <Text style={styles.label}>New Password</Text>
      <TextInput secureTextEntry style={styles.input} value={newPass} onChangeText={setNewPass} />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput secureTextEntry style={styles.input} value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>



  </View>
  );
};

export default ChangePassword;

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
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 15, backgroundColor:'white',
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
  
