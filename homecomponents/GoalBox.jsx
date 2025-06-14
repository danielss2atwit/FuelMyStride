import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function GoalBox(){

    return(
        <View style={styles.container}>
            <Text style={styles.title}>✅Goal:</Text>
            <Text style={styles.goal}>Fuel Well</Text>

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

