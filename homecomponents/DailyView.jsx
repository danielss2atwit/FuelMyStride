import React , {useState, useCallback} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getLogs } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';





function DailyView() {
  const [logs, setLogs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchTodayLogs = async () => {
        try{
        const foodLogs = await getLogs('FOOD_LOGS');
        const workoutLogs = await getLogs('WORKOUT_LOGS');

        const today = new Date().toISOString().split('T')[0];
        const allLogs = [...(foodLogs || []), ...(workoutLogs || [])];

        const todayLogs = allLogs.filter((log) =>
          log.timestamp?.startsWith(today)
        );

        const formatted = todayLogs.map((log) => {
          if (log.type === 'workout') {
            return {
              type: log.intensity?.toLowerCase() || 'moderate',
              label: 'workout',
              time: log.time || '00:00',
            };
          } else {
            return {
              type: log.mealType?.toLowerCase() || 'snack',
              label: log.mealType || 'food',
              time: log.time || '00:00',
            };
          }
        });

      // Sort by time (HH:MM)
          const sorted = formatted.sort((a, b) => {
            const toMinutes = (t) => {
              const [h, m] = t.split(':').map(Number);
              return h * 60 + m;
            };
            return toMinutes(a.time) - toMinutes(b.time);
          });

          if (isActive) setLogs(sorted);
        } catch (err) {
          console.error('Error loading daily logs:', err);
        }
      };

      fetchTodayLogs();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>5:00 am</Text>
        <Text style={styles.centerText}>Daily View</Text>
        <Text style={styles.timeText}>10:00 pm</Text>
      </View>

      <View style={styles.container}>
         {logs.length === 0 ? (
          <Text style={{ fontSize: 12 }}>No logs yet</Text>
        ) : (
          logs.map((log, index) => (
            <View key={index} style={[styles.block, getStyleByType(log.type)]}>
              <Text style={styles.label}>{log.label}</Text>
            </View>
          ))
        )}
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

