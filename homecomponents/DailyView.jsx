import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const dummyLogs = [
  { type: 'breakfast', label: 'breakfast', time: '07:30' },
  { type: 'hard', label: 'workout', time: '09:00' },
  { type: 'lunch', label: 'Lunch', time: '12:00' },
  { type: 'snack', label: 'snack', time: '14:30' },
  { type: 'dinner', label: 'dinner', time: '18:30' },
  { type: 'snack', label: 'snack', time: '21:00' },
];

// Sort logs by time
const sortedLogs = [...dummyLogs].sort((a, b) => a.time.localeCompare(b.time));


function DailyView() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>5:00 am</Text>
        <Text style={styles.centerText}>Daily View</Text>
        <Text style={styles.timeText}>10:00 pm</Text>
      </View>

      <View style={styles.container}>
        {sortedLogs.map((log, index) => (
          <View key={index} style={[styles.block, getStyleByType(log.type)]}>
            <Text style={styles.label}>{log.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default DailyView

const getStyleByType = (type) => {
  switch (type) {
    case 'breakfast': return { backgroundColor: '#97E981' };
    case 'lunch': return { backgroundColor: '#EDBDA4' };
    case 'dinner': return { backgroundColor: '#D7A4ED' };
    case 'snack': return { backgroundColor: '#F4C4DB' };
    case 'easy': return { backgroundColor: '#C4F0F4' };
    case 'moderate': return { backgroundColor: '#98B6D4' };
    case 'hard': return { backgroundColor: '#7477B8' };
    default: return { backgroundColor: '#ccc' };
  }
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#444',
  },
  centerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  block: {
    height: 100,
    width: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  label: {
    textAlign: 'center',
    fontSize: 11,
  },
});

