import React from 'react';
import { Image,View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OpeningPage = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/opening-background.jpg')}
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Image source={require('../images/logo-only.png')} style={styles.image}></Image>
        <Text style={styles.logo}>FUEL MY STRIDE</Text>
        <Text style={styles.tagline}>Run. Refuel. Repeat.</Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OpeningPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor:'#000',
    textShadowOffset:{width:1,height:1},
    textShadowRadius:2,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#f39c12',
    padding: 12,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
  },
  createButton: {
    backgroundColor: '#513772',
    padding: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image:{
    width:80,
    height:80,
  }
});