import{Modal,View,StyleSheet,Text, TouchableOpacity,Pressable,ScrollView,FlatList} from 'react-native';
import React, { useState, useEffect, useCallback} from 'react';
import {getLogs,clearLogs} from '../utils/storage';
import {useFocusEffect} from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { clearInsights } from '../InsightsService';


const workoutFeelingOptions = [
  { label: 'Full, had sufficient energy', icon: '🍽️' },
  { label: 'Moderate, got harder towards the end', icon: '🍜' },
  { label: 'Empty, low energy throughout', icon: '🥄' },
];



function PastLogs(){
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading,setLoading] = useState(true);


  

  
    const fetchLogs = useCallback (async () => {
      try{
        setLoading(true);
    const foodLogs = await getLogs('FOOD_LOGS');
    const workoutLogs = await getLogs('WORKOUT_LOGS');
    const allLogs = [...foodLogs, ...workoutLogs];

    const sorted = allLogs.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    const grouped = groupLogsByDate(sorted);
    setLogs(grouped);
  }catch(e){
    console.error('Error fetching logs:',e);

  }finally{
    setLoading(false);
  }
},[]);

    useFocusEffect(
      useCallback(() => {
        fetchLogs();
      },[fetchLogs])
    );
    
  

  const openModal = (log) =>{
    setSelectedLog(log);
    setModalVisible(true);
  };
  const closeModal =() =>{
    setModalVisible(false);
    setSelectedLog(null);
  };





  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    return date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
  };

  const groupLogsByDate = (logsArray) => {
  const grouped = {};

  logsArray.forEach((log) => {
    const dateObj = new Date(log.timestamp);
    const dateKey = dateObj.toISOString().split('T')[0];
  

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        logs: [],
      };
    }

    grouped[dateKey].logs.push(log);
  });

  // Convert object to array sorted by date descending
  return Object.values(grouped).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

const getIconsForGroup = (group) => {
  return group.logs.map(log => {
    if (log.type === 'workout') return '🏃‍♂️';
    if (log.mealType === 'Breakfast') return '🥐';
    if (log.mealType === 'Lunch') return '🍴';
    if (log.mealType === 'Dinner') return '🍽️';
    if (log.mealType === 'Snack') return '🍎';
    if (log.mealType === 'Drink') return '🥤';
    return '';
  }).join(' ');
};

const getMealTypeColor = (mealType) => {
    switch (mealType) {
      case 'Breakfast':
        return '#FFD700'; // Gold
      case 'Lunch':
        return '#87CEEB'; // Sky Blue
      case 'Dinner':
        return '#FF7F50'; // Coral
      case 'Snack':
        return '#90EE90'; // Light Green
      case 'Drink':
        return '#B0E0E6'; // Powder Blue
      default:
        return '#f0f4f8'; // Default box color
    }
  };

   const getLogColor = (log) => {
    if (log.type === 'workout') return '#D1C4E9'; // light purple for workouts
    return getMealTypeColor(log.mealType);
  };

   if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }


    return(
      
        <View style={{ flex: 1 }}>
      <Text style={styles.title}>Past Logs</Text>
      {logs.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No logs yet</Text>
      ) : (
        <FlatList
        scrollEnabled={false}
    data={logs}
    keyExtractor={(item, index) => item.date + index} // use unique key here
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => openModal(item)} style={styles.row}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <Text style={styles.icons}>{getIconsForGroup(item)} </Text>
      </TouchableOpacity>
    )}
  />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedLog?.date ? `${formatDate(selectedLog.date)} Overview` : 'Log Overview'}
            </Text>
            <ScrollView style={{ maxHeight: '70%' }}>
              {Array.isArray(selectedLog?.logs) && selectedLog.logs.length > 0 ? (
                selectedLog.logs.map((log, idx) => (
                  <View key={idx} style={[styles.logBox, { backgroundColor: getLogColor(log) }]}>
                    {log.type === 'workout' ? (
                      <>
                        <Text style={styles.sectionHeader}>Workout Type:</Text>
                        <Text style={styles.modalText}>{log?.workoutType || 'N/A'}</Text>

                        <Text style={styles.sectionHeader}>Time:</Text>
                        <Text style={styles.modalText}>{log?.time || 'N/A'}</Text>

                        <Text style={styles.sectionHeader}>Duration:</Text>
                        <Text style={styles.modalText}>
                          {log?.duration && typeof log.duration === 'object'
                          ? `${log.duration.hours}h ${log.duration.minutes}m ${log.duration.seconds}s`
                          : log?.duration || 'N/A'}
                          </Text>

                        <Text style={styles.sectionHeader}>Distance:</Text>
                        <Text style={styles.modalText}>
                          {log?.distance && typeof log.distance === 'object'
                          ? `${log.distance.whole}.${log.distance.decimal} ${log.distance.unit}`
                          : log?.distance || 'N/A'}

                        </Text>

                        <Text style={styles.sectionHeader}>Pace:</Text>
                        <Text style={styles.modalText}>
                        {log?.pace && typeof log.pace === 'object'
                        ? `${log.pace.minutes}:${log.pace.seconds} per ${log.pace.unit}`
                        : log?.pace || 'N/A'}

                        </Text>
                          
                           <Text style={styles.sectionHeader}>Feeling:</Text>
                        {(() => {
                        const match = workoutFeelingOptions.find(opt => opt.label === log?.intensity);
                        return (
                       <Text style={styles.modalText}>
                        {match ? `${match.icon} ${match.label}` : log?.intensity || 'N/A'}
                        </Text>
                          );
                          })()}


                        <Text style={styles.sectionHeader}>Notes:</Text>
                        <Text style={styles.modalText}>{log?.notes || 'None'}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.sectionHeader}>Meal Type:</Text>
                        <Text style={styles.modalText}>{log?.mealType || 'N/A'}</Text>

                        <Text style={styles.sectionHeader}>Time:</Text>
                        <Text style={styles.modalText}>{log?.time || 'N/A'}</Text>

                        <Text style={styles.sectionHeader}>Tags:</Text>
                        {Array.isArray(log?.tags) && log.tags.length > 0 ? (
                          log.tags.map((tag, i) => (
                            <Text key={i} style={styles.modalText}>
                              • {String(tag)}
                            </Text>
                          ))
                        ) : (
                          <Text style={styles.modalText}>None</Text>
                        )}

                        <Text style={styles.sectionHeader}>Description:</Text>
                        <Text style={[styles.modalText, { marginTop: 2 }]}>
                          {log?.description || 'No description'}
                        </Text>

                        <Text style={[styles.sectionHeader, { marginTop: 8 }]}>Feeling:</Text>
                        <Text style={[styles.modalText, { marginTop: 2 }]}>
                          {log?.feeling || 'N/A'}
                        </Text>
                      </>
                    )}
                    <View style={{ height: 10 }} />
                  </View>
                ))
              ) : (
                <Text>No logs available for this day</Text>
              )}
            </ScrollView>

            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      

      
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
    marginHorizontal:10,
    borderRadius:8,
  },
  date: {
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
     maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionHeader: {
    fontWeight: '600',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    marginTop: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#822f88',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  logBox: {
  backgroundColor: '#f0f4f8',     // Light neutral color
  padding: 10,
  borderRadius: 10,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
},
clearButton: {
  backgroundColor: '#d9534f',
  padding: 12,
  margin: 10,
  borderRadius: 6,
},

});

export default PastLogs