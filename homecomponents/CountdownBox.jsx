import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CountdownBox() {
   const today = new Date();
    const raceDate = new Date('2025-06-16'); // <-- Set your race day here

    // Calculate difference in time
  const diffTime = raceDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days

  return (
     <View style={styles.container}>
      <Text style={styles.title}>🏁 Race Day</Text>
      <Text style={styles.countdown}>{diffDays}</Text>
      <Text style={styles.label}>days to go</Text>
    </View>
  );
}

export default CountdownBox;

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#C1EFC0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 100,
    height: 170,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    marginTop:10,
  },
  countdown: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#536D51',
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    marginBottom:10,
  },
});
