import React, {useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function GoalBox(){

    const [goal, setGoal] = useState(null);

    useFocusEffect( 
    useCallback(() => {
    const loadGoal = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user_goal');
        if (jsonValue != null) {
          setGoal(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log('Failed to load goal.', e);
      }
    };
    loadGoal();
  }, [])
);

  if (!goal) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>✅ Goal:</Text>
        <Text style={styles.goal}>No goal set</Text>
      </View>
    );
  }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>✅Goal:</Text>
            <Text style={styles.goal}>{goal.distance}</Text>

        </View>
    );
}

export default GoalBox;

const styles = StyleSheet.create({
    container:{
    backgroundColor: '#FFD7A2',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    marginTop:20,
    },
    title:{
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    marginTop:10,
    },
    goal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC830D',
    },

})

