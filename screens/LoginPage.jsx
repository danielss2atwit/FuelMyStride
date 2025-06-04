import React, { useState } from 'react';
import { Image,ImageBackground,View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Add validation or authentication logic here
    navigation.navigate('MainTabs'); // Navigate to home/main screen after login
  };

  return (
    <ImageBackground source={require('../assets/marathon.jpg')}
    style={styles.background}
      blurRadius={5}>
    <View style={styles.container}>
        <Image source={require('../images/logo-only.png')} style={styles.image}></Image>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  background:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor:'black',
    textShadowOffset:{width:1,height:1},
    textShadowRadius:2,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    width:'90%',
  },
  button: {
    backgroundColor: '#f4a428',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image:{
    width:80,
    height:80,
    
  }
});