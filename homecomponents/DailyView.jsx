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
          const userTime = (log.time || '').trim();

           return {
              type: log.type === 'workout'
                ? (log.intensity?.toLowerCase() || 'moderate')
                : (log.mealType?.toLowerCase() || 'snack'),
              label: log.type === 'workout' ? 'workout' : (log.mealType || 'food'),
              time: userTime,
              fallbackTime: log.timestamp, // for sorting fallback
            };
          
           
        });



       // Helper: convert time like "10:15 AM" to minutes
          const toMinutes = (timeStr, fallbackISO) => {
            if (timeStr && timeStr.includes(':')) {
              try {

                const cleanTime = timeStr.replace(/\s+/g, ' ').trim();
                const parts = cleanTime.split(' ');

                if (parts.length >= 2){
                  const timePart = parts[0];
                  const modifier = parts[1].toLowerCase();

                  const [hoursStr, minutesStr] = timePart.split(':');
                  let hours = parseInt(hoursStr, 10);
                  let minutes = parseInt(minutesStr,10);
                  if (isNaN(hours) || isNaN(minutes)){
                    throw new Error('Invalid time format');
                  }
                  if (modifier === 'pm' && hours !== 12){
                    hours += 12;
                  }else if (modifier === 'am' && hours === 12){
                    hours = 0;
                  }
                  return hours * 60 + minutes
                }
              }catch (error){
                console.warn('Error parsing time:', timeStr,error);
              }
            }
            if (fallbackISO){
              const d = new Date(fallbackISO);
              return d.getHours() * 60 + d.getMinutes();
            }
            return 0;
          };

          const withMinutes = formatted.map(log => ({
            ...log,
            minutes: toMinutes(log.time, log.fallbackTime)
          }));

          const sorted= [...withMinutes].sort((a,b) => {
            console.log(`Comparing: ${a.label} (${a.time} = ${a.minutes}) vs ${b.label} (${b.time} = ${b.minutes})`);
            return a.minutes - b.minutes;
          });

    
          console.log('📆 sorted logs:',sorted.map(log => ({
            label: log.label,
            time: log.time,
            minutes:log.minutes
          })));

          const sortedTimes = sorted.map(log => `${log.label}: ${log.time} (${log.minutes})`);
          console.log('⏰Final Order:',sortedTimes);

          if (isActive) setLogs(sorted);
        }catch (err) {
          console.error('❌Error loading daily logs:', err);
        }
      };
      fetchTodayLogs();
      return () => {
        isActive = false;
      };
    },[])
  );

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
              <Text style={styles.label}>{log.label} @ {log.time}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

export default DailyView


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

