import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { useNavigation} from '@react-navigation/native';

function InsightsCard() {
  const navigation = useNavigation();
  return (
    <View>
    <View style={styles.card}>
      <Text style={styles.title}>Insights:</Text>
      <Text style={styles.text}>
        -This was your fastest workout in the past 3 weeks!
        
      </Text>

      
    </View>
    <View style={styles.buttonContainer}>
        <Button 
        title="Back to Home"
        onPress={() => navigation.navigate('MainTabs',{screen:'Home'})} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth:350,
    margin:20,
    height:200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
  buttonContainer:{
    marginTop:8,
  },
});

export default InsightsCard;