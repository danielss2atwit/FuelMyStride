import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation();
  return(
  
  <View style={styles.container}>
    
      {/* ✅ Back to Settings Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Settings</Text>
      </TouchableOpacity>

    <View style={styles.centerContent}>
        <Text style={styles.title}>Notifications</Text>
        {/* Add any other main content below */}
      </View>



  </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fef1de',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop:50,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize:12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',  // Vertical centering
    alignItems: 'center',      // Horizontal centering
  },
  
});
