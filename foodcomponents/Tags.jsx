import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const AVAILABLE_TAGS = [
  'High Protein', 'Low Carb', 'High Carb', 'Veg Packed', 'Light',
  'Heavy', 'Balanced', 'Pre-Run', 'Post-Run', 'Post-Workout', 'Rest Day', 'Hydrating'
];

const Tags = ({ onChangeTags }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    let newTags;
    if (selectedTags.includes(tag)) {
      newTags = selectedTags.filter(t => t !== tag);
    } else {
      newTags = [...selectedTags, tag];
    }
    setSelectedTags(newTags);
    onChangeTags && onChangeTags(newTags); // notify parent
  };

  const renderTag = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <TouchableOpacity
        style={[styles.tag, isSelected && styles.selectedTag]}
        onPress={() => toggleTag(item)}
      >
        <Text style={[styles.tagText, isSelected && styles.selectedText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Meal Tags:</Text>
      <FlatList
        data={AVAILABLE_TAGS}
        renderItem={renderTag}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tag: {
    padding: 10,
    margin: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selectedTag: {
    backgroundColor: '#FF6B00',
  },
  tagText: {
    color: '#333',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tags;