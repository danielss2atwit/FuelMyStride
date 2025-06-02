import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';


function GoalCalendar() {

  const today = new Date();
  const todayStr = today.getFullYear() + '-' +
  String(today.getMonth() + 1).padStart(2, '0') + '-' +
  String(today.getDate()).padStart(2, '0');


  return (
    <View style={styles.container}>
      <Calendar
      style={{
    borderRadius: 10,
    height: 100,       // control calendar height
    width: 250,        // control calendar width
    paddingBottom: 10,
  }}
      // show arrows to switch months
      enableSwipeMonths={true}
      markingType={'custom'}
      markedDates={{
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
        '2025-06-16': {
      customStyles: {
        container: {
          backgroundColor: 'yellow',
        },
        text: {
          color: 'black',
          fontWeight: 'bold',
        },
      },
      marked: true,
      dotColor: 'yellow',
    },
      }}
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
