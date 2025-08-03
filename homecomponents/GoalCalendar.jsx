import React, {useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function GoalCalendar() {

  const [goalDate, setGoalDate] = useState(null);

  useFocusEffect(
  useCallback(() => {
    const loadGoal = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_goal');
        if (jsonValue != null) {
          const goal = JSON.parse(jsonValue);
          setGoalDate(goal.date.split('T')[0]); // yyyy-mm-dd format
        }
      } catch (e) {
        console.log('Failed to load goal.', e);
      }
    };
    loadGoal();
  }, [])
);

  const today = new Date();
  const todayStr =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0');

  const markedDates = {
    [todayStr]: {
      customStyles: {
        container: {
          backgroundColor: '#FFF5E1',
        },
        text: {
          color: '#FF6B00',
          fontWeight: 'bold',
        },
      },
      marked: true,
      dotColor: '#FF6B00',
    },
  };

  if (goalDate) {
    markedDates[goalDate] = {
      customStyles: {
        container: {
          backgroundColor: '#FFD700', // gold highlight
        },
        text: {
          color: 'black',
          fontWeight: 'bold',
        },
      },
      marked: true,
      dotColor: '#FFD700',
    };
  }


  return (
    <View style={styles.container}>
     <Calendar
        style={{
          borderRadius: 10,
          height: 100,
          width: 250,
          paddingBottom: 10,
        }}
        enableSwipeMonths={true}
        markingType={'custom'}
        markedDates={markedDates}
        renderArrow={(direction) =>
          direction === 'left' ? (
            <Ionicons name="chevron-back" size={24} color="#444" />
          ) : (
            <Ionicons name="chevron-forward" size={24} color="#444" />
          )
        }
      />
    </View>
  );
}

export default GoalCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 6,
    padding: 10,
    backgroundColor: '#eef',
    borderRadius: 8,
    height:330,
  },
 
});
