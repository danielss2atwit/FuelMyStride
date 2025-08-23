import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const [ageRange, setAgeRange] = useState('18-24');

  return (
    <ImageBackground source={require('../assets/create-account.jpg')} style={styles.background}
    blurRadius={5}>
      <View style={styles.container}>
       

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

        <Text style={styles.label}>Age Range</Text>
         <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={ageRange}
            onValueChange={setAgeRange}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="18–24" value="18-24" />
            <Picker.Item label="25–39" value="25-39" />
            <Picker.Item label="40–59" value="40-59" />
            <Picker.Item label="60–64" value="60-64" />
            <Picker.Item label="65+" value="65+" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount2')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#4B0082',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4B0082',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
pickerWrapper: {
  backgroundColor: '#fff',
  borderRadius: 6,
  borderColor: '#ccc',
  borderWidth: 1,
  marginBottom: 20,
  overflow: 'hidden',
  height: 50,
  justifyContent: 'center',
},

picker: {
  width: '100%',
  color: '#000',
  marginTop: Platform.OS === 'android' ? -8 : 0, // fix text alignment on Android
},
});