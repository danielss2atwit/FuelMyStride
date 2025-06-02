import React, { useState } from 'react';
import FoodHeader from '../foodcomponents/FoodHeader';
import { ScrollView,Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Tags from '../foodcomponents/Tags'



function LogFood() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const feelings = ['Energized⚡️', 'Good 🙂', 'Tired 😴'];


  const [tags, setTags] = useState([]);
   const handleTagsChange = (newTags) => {
    setTags(newTags);
    // You can store this with meal data later
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
      <View style={styles.container}>
        <FoodHeader />

        {/* Meal Type */}
        <Text style={styles.label}>Meal</Text>
        <View style={styles.mealOptions}>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal}
              style={[
                styles.mealButton,
                selectedMeal === meal && styles.mealButtonSelected,
              ]}
              onPress={() => setSelectedMeal(meal)}
            >
              <Text style={styles.mealText}>{meal}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Input */}
        <Text style={styles.label}>Time</Text>
        <TextInput style={styles.input} placeholder="e.g. 12:30 PM" />

        {/* Ideal Plate Recommendation */}
        <View style={styles.plateCard}>
          <Text style={styles.plateText}>
            🍽️ Ideal Plate: ⅓ Carbs | ⅓ Protein | ⅓ Color
          </Text>
          <Text style={styles.plateSubtext}>Based on your last workout</Text>
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Briefly describe what you ate..."
        />

        {/*Tags */}
        <Tags onChangeTags={handleTagsChange}/>

        {/* How did you feel */}
        <Text style={styles.label}>How did you feel?</Text>
        <View style={styles.feelingOptions}>
          {feelings.map((feeling) => (
            <TouchableOpacity
              key={feeling}
              style={[
                styles.feelingButton,
                selectedFeeling === feeling && styles.feelingButtonSelected,
              ]}
              onPress={() => setSelectedFeeling(feeling)}
            >
              <Text>{feeling}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LogFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2f0d2',
    padding: 10,
  },
  title: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 70,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  mealOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealButton: {
    backgroundColor: '#fff3b0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  mealButtonSelected: {
    borderColor: '#b8860b',
    borderWidth: 2,
  },
  mealText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  plateCard: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 6,
    marginVertical: 15,
  },
  plateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  plateSubtext: {
    fontSize: 12,
    color: '#555',
  },
  feelingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  feelingButton: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  feelingButtonSelected: {
    borderColor: '#b8860b',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: '#556b2f',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
