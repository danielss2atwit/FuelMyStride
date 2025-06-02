import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function IdealPlate() {
  return (
    <View style={styles.container}>
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
    marginBottom: 30,
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
  },
});

export default IdealPlate;