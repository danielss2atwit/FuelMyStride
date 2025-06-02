import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';

function WorkoutInput(){

    const [selectedTag, setSelectedTag] = useState(null);
  const tags = ['Easy', 'Moderate', 'Hard'];

    return(
         <View style={styles.container}>
      <Text style={styles.label}>Workout Intensity</Text>
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTag(tag)}
            style={[
              styles.tag,
              selectedTag === tag && styles.selectedTag,
            ]}
          >
            <Text
              style={[
                styles.tagText,
                selectedTag === tag && styles.selectedTagText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Fields */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Start Time</Text>
        <TextInput style={styles.inputBox} placeholder="e.g. 7:30 AM" />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Duration</Text>
        <TextInput style={styles.inputBox} placeholder="e.g. 45 mins" />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Distance</Text>
        <TextInput style={styles.inputBox} placeholder="e.g. 5 miles" />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Pace</Text>
        <TextInput style={styles.inputBox} placeholder="e.g. 6:30 /mi" />
      </View>
    </View>
    );



}
const styles = StyleSheet.create({
 container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedTag: {
    backgroundColor: '#822f88',
    borderColor: '#822f88',
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTagText: {
    color: 'white',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    width: 100,
    backgroundColor: '#822f88',
    color: 'white',
    padding: 8,
    textAlign: 'center',
    marginRight: 10,
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'white',
    height: 35,
    paddingHorizontal: 8,
  },
});


export default WorkoutInput;