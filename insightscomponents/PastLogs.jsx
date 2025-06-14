import{Modal,View,Image,StyleSheet,Text, TouchableOpacity,Pressable} from 'react-native';
import React, { useState} from 'react';

const logs = [
  { date: 'May 4th', icons: '🥐 🏃‍♂️', meals: ['Breakfast: Bagel', 'Lunch: Pasta'], workout: '3 mile run' },
  { date: 'May 5th', icons: '🏃‍♂️', meals: ['Dinner: Chicken Bowl'], workout: 'Speed workout' },
  { date: 'May 6th', icons: '🥐 🍴', meals: ['Lunch: Sandwich', 'Dinner: Stir Fry'], workout: 'Rest day' },
];

function PastLogs(){
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(null);

  const openModal = (log) =>{
    setSelectedLog(log);
    setModalVisible(true);
  };
  const closeModal =() =>{
    setModalVisible(false);
    setSelectedLog(null);
  }

    return(
       <View>
      <Text style={styles.title}>Past Logs</Text>
      {logs.map((log, index) => (
        <TouchableOpacity key={index} onPress={() => openModal(log)} style={styles.row}>
          <Text style={styles.date}>{log.date}</Text>
          <Text style={styles.icons}>{log.icons}</Text>
        

        </TouchableOpacity>
      ))}
       <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedLog?.date} Overview</Text>
            <Text style={styles.sectionHeader}>Meals:</Text>
            {selectedLog?.meals.map((meal, idx) => (
              <Text key={idx} style={styles.modalText}>{meal}</Text>
            ))}
            <Text style={styles.sectionHeader}>Workout:</Text>
            <Text style={styles.modalText}>{selectedLog?.workout}</Text>
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

});

export default PastLogs