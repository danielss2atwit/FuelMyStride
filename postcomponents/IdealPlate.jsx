import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function IdealPlate() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is your recommended plate for your next meal:</Text>
      <Image
        source={require('../assets/ideal_plate.jpg')} // Update the path as needed
        style={styles.image}
      />
      <Text style={styles.caption}>
        🍽️ Ideal Plate: ⅓ Carbs | ⅓ Protein | ⅓ Color
      </Text>
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
    fontSize:16,
    marginTop:20,
    textDecorationLine:'underline',

  },
});

export default IdealPlate;