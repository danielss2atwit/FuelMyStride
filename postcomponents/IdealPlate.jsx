import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function IdealPlate() {
  return (
    <View style={styles.container}>
      <View style={styles.calloutBox}>
      <Text style={styles.text}>🍽️Here is your recommended plate for your next meal:</Text>
      </View>
      <Image
        source={require('../assets/ideal_plate.jpg')} // Update the path as needed
        style={styles.image}
      />
      <View style={styles.plateBanner}>
      <Text style={styles.caption}>
        🍽️ Ideal Plate: ⅓ Carbs | ⅓ Protein | ⅓ Color
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    backgroundColor:'#E1F4F9',
    padding:10,
    borderRadius:5,
  },
  text:{
    fontSize:15,
    fontWeight: '500',
    color: '#0369A1',
  
    
    

  },
  calloutBox:{
    backgroundColor: '#E0F2FE',
    padding:10,
    borderRadisu:8,
    marginVertical:10,
    alignSelf:'center',
    margin:20,

  }
});

export default IdealPlate;