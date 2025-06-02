import{View,Image,StyleSheet,Text} from 'react-native';
import React from 'react';

const logs = [
  { date: 'May 4th', icons: '🥐 🏃‍♂️' },
  { date: 'May 5th', icons: '🏃‍♂️' },
  { date: 'May 6th', icons: '🥐 🍴' },
];

function PastLogs(){

    return(
       <View>
      <Text style={styles.title}>Past Logs</Text>
      {logs.map((log, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.date}>{log.date}</Text>
          <Text style={styles.icons}>{log.icons}</Text>
        </View>
      ))}
    </View>
    );
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAE2D8',
    padding: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    margin:10,
  },
  date: {
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
  },
});

export default PastLogs