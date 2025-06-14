import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';

function InsightsCard() {
  const navigation = useNavigation();
  return (
    <View>
    <View style={styles.card}>
      <Text style={styles.title}>Insights:</Text>
      <Text style={styles.text}>
        -This was your fastest workout in the past 3 weeks!{'\n\n'}
        -Skipping post-run meals led to a noticeable dip in pace the next day.
        
      </Text>

      
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => navigation.navigate('MainTabs',{screen:'Home'})} >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset:{width: 0, height: 2},
    elevation: 3,
    maxWidth:350,
    margin:16,
    height:200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#374151',
  },
  buttonContainer:{
    marginTop:8,
  },
  homeButton:{
    backgroundColor: '#3B82F6',
    paddingVertical:12,
    borderRadius:10,
    alignItems: 'center',
    margin:20,
  },
  homeButtonText:{
    color:'#FFFFFF',
    fontSize:16,
    fontWeight:'600',
  }

});

export default InsightsCard;