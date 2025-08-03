import React, {useState, useCallback} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CountdownBox() {
  const [daysLeft, setDaysLeft] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadGoalDate = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@user_goal');
          if (jsonValue != null) {
            const goal = JSON.parse(jsonValue);
            const today = new Date();
            const raceDate = new Date(goal.date);
            const diffTime = raceDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysLeft(diffDays);
          } else {
            setDaysLeft(null);
          }
        } catch (e) {
          console.log('Error loading goal date', e);
        }
      };
      loadGoalDate();
    }, [])
  );

  return (
     <View style={styles.container}>
      <Text style={styles.title}>🏁 Race Day</Text>
      {daysLeft !== null ? (
        <>
          <Text style={styles.countdown}>{daysLeft}</Text>
          <Text style={styles.label}>days to go</Text>
        </>
      ) : (
        <Text style={styles.label}>No goal set</Text>
      )}
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
