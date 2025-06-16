import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import { useState } from 'react';

function WorkoutRanking({selectedIndex,onSelect}){


    const options = [
    { label: 'Full, had sufficient energy', icon: '🍽️' },
    { label: 'Moderate, got harder towards the end', icon: '🍜' },
    { label: 'Empty, low energy throughout', icon: '🥄' },
  ];


    return(
      <View>
      <Text style={styles.label}>Perceived hunger/fullness after workout</Text>
      <View style={styles.row}>
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              selectedIndex === index && styles.selectedBox, // highlight selected
            ]}
            onPress={() => onSelect(index)}
          >
            <Text style={styles.icon}>{opt.icon}</Text>
            <Text style={styles.text}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    );



}

const styles = StyleSheet.create({
  label: {
    backgroundColor: '#822f88',
    color: 'white',
    padding: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  box: {
    width: 90,
    backgroundColor: '#fff3e0',
    padding: 10,
    alignItems: 'center',
    borderRadius:6,
  },
  selectedBox:{
    borderColor: '#822f88',
    borderWidth:2,

  },
  icon: {
    fontSize: 24,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WorkoutRanking;