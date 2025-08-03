import React, { useState, useEffect, useRef } from 'react';
import FoodHeader from '../foodcomponents/FoodHeader';
import {ScrollView,Alert,Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Tags from '../foodcomponents/Tags'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { saveLog } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';




function LogFood({navigation}) {
  const [carbCount, setCarbCount] = useState(0);
const [proteinCount, setProteinCount] = useState(0);
const [colorCount, setColorCount] = useState(0);
const [showPortionTooltip, setShowPortionTooltip] = useState(false);
const [plateType, setPlateType] = useState('moderate');
const [trainingScore, setTrainingScore] = useState(0);

  const [resetTags, setResetTags] = useState(false);
  const [dailyConsumed, setDailyConsumed] = useState({carbs:0, protein:0, color:0});
 
  const scrollRef = useRef(null);

  const [dailyTargets, setDailyTargets] = useState({
    carbs:[8,10],
    protein:[5,6],
    color:[2,3]
  });

  useEffect(() => {
    fetchWorkoutIntensity();
    calculatePortionTotalsToday();
  },[]);


  const convertPortionsToTimes = ([min, max]) => {
  // Convert servings to recommended times per day
  if (max >= 8) return '5+ times';
  if (max >= 6) return '4–5 times';
  if (max >= 4) return '3–4 times';
  return '2–3 times';
};

  const estimatePlateType = (workouts) => {
  if (!workouts || workouts.length === 0) return 'moderate';

  const latestWorkout = workouts.reduce((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? a : b
  );

  const { intensity, duration = 0, distance = 0, pace = 0 } = latestWorkout;

  const score = 
    (intensity === 'high' ? 3 : intensity === 'moderate' ? 2 : 1) +
    duration / 30 +     // 30+ min adds weight
    distance / 3 +      // 3+ miles adds weight
    (pace && pace < 10 ? 1 : 0); // fast pace bonus

  if (score >= 6) return 'hard';
  if (score >= 4) return 'moderate';
  return 'easy';
};


const calculateTrainingLoad = ({ intensity, duration = 0, distance = 0, pace = 0 }) => {
  let score = 0;

  // Intensity weight
  if (intensity === 'hard') score += 3;
  else if (intensity === 'moderate') score += 2;
  else score += 1;

  // Duration (per 30 min)
  score += duration / 30;

  // Distance (per 3 miles or ~5km)
  score += distance / 3;

  // Faster pace (<10 min/mile)
  if (pace && pace < 10) score += 1;

  return score;
};

const getTotalPortionsFromScore = (score) => {
  if (score < 4) return 16;        // Easy day
  else if (score < 7) return 20;   // Moderate day
  else return 24;                  // Hard day
};


const getPortionRangesFromPlate = (plateType, score) => {
  const TOTAL_PORTIONS = getTotalPortionsFromScore(score);

  const range = (percent) => {
    const min = Math.floor(TOTAL_PORTIONS * percent - 1);
    const max = Math.ceil(TOTAL_PORTIONS * percent + 1);
    return [min, max];
  };

  if (plateType === 'easy') {
    return {
      carbs: range(0.25),
      protein: range(0.25),
      color: range(0.50),
    };
  } else if (plateType === 'moderate') {
    return {
      carbs: range(0.35),
      protein: range(0.25),
      color: range(0.40),
    };
  } else if (plateType === 'hard') {
    return {
      carbs: range(0.50),
      protein: range(0.25),
      color: range(0.25),
    };
  }
};


  const fetchWorkoutIntensity = async () => {
  try {
    const storedWorkoutLogs = await AsyncStorage.getItem('WORKOUT_LOGS');
    const logs = storedWorkoutLogs ? JSON.parse(storedWorkoutLogs) : [];
    if (logs.length === 0) return;

    const latestWorkout = logs.reduce((a, b) =>
      new Date(a.timestamp) > new Date(b.timestamp) ? a : b
    );

    const type = estimatePlateType(logs);
    const score = calculateTrainingLoad(latestWorkout);
    const portionTargets = getPortionRangesFromPlate(type, score);

    setPlateType(type);
    setTrainingScore(score);
    setDailyTargets(portionTargets);
  } catch (error) {
    console.error('Error fetching workout data:', error);
  }
};

    const calculatePortionTotalsToday = async () => {
    try {
      const stored = await AsyncStorage.getItem('FOOD_LOGS');
      const logs = stored ? JSON.parse(stored) : [];
      const today = new Date().toDateString();

      const todayLogs = logs.filter(log =>
        new Date(log.timestamp).toDateString() === today && log.portions
      );

      let totals = { carbs: 0, protein: 0, color: 0 };

      todayLogs.forEach(log => {
        totals.carbs += log.portions?.carbs || 0;
        totals.protein += log.portions?.protein || 0;
        totals.color += log.portions?.color || 0;
      });

      setDailyConsumed(totals);
    } catch (error) {
      console.error('Error calculating daily portions:', error);
    }
  };

  const readLogs = async () => {
  try {
    const storedFoodLogs = await AsyncStorage.getItem('FOOD_LOGS');
    const storedWorkoutLogs = await AsyncStorage.getItem('WORKOUT_LOGS');

    const foodLogs = storedFoodLogs ? JSON.parse(storedFoodLogs) : [];
    const workoutLogs = storedWorkoutLogs ? JSON.parse(storedWorkoutLogs) : [];

    console.log('🍽️ FOOD LOGS:', foodLogs);
    console.log('🏋️ WORKOUT LOGS:', workoutLogs);

    Alert.alert(
      'Logs read',
      `Food logs: ${foodLogs.length}\nWorkout logs: ${workoutLogs.length}\nSee console for details.`
    );
  } catch (error) {
    console.error('Error reading logs:', error);
    Alert.alert('Error', 'There was a problem reading the logs.');
  }
};

  const [description, setDescription] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];
  const feelings = ['Energized⚡️', 'Good 🙂', 'Tired 😴'];
  const [tags, setTags] = useState([]);

   const handleTagsChange = (newTags) => {
    setTags(newTags);
    // You can store this with meal data later
  };

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [time, setTime] = useState('');

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirm = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setTime(formattedTime);
    hideTimePicker();
  };

  const [showTooltip, setShowTooltip] = useState(false);

  // The important function to handle submission
  const handleSubmit = async () => {
     console.log('Submitting log with:', { selectedMeal, time, selectedFeeling, tags, description });
    if (!selectedMeal) {
      Alert.alert('Please select a meal type.');
      return;
    }
    if (!time) {
      Alert.alert('Please select a time.');
      return;
    }
    if (!selectedFeeling) {
      Alert.alert('Please select how you felt after eating.');
      return;
    }

    const now = new Date();
    const formattedNow = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const log = {
      type: 'food',
      mealType: selectedMeal,
      time: time || formattedNow,
      feeling: selectedFeeling,
      tags,
      description,
      portions:{
        carbs: carbCount,
        protein: proteinCount,
        color:colorCount
      },
      timestamp: now.toISOString(),
    };

    try {
      await saveLog(log);
      await calculatePortionTotalsToday();
      Alert.alert('Success', 'Your food log has been saved!');
      navigation.goBack();
      // Optional: Reset form after submit
      setSelectedMeal(null);
      setTime('');
      setSelectedFeeling(null);
      setTags([]);
      setDescription('');
      setCarbCount(0);
      setProteinCount(0);
      setColorCount(0);
      setResetTags(prev => !prev);
    } catch (error) {
      Alert.alert('Error', 'There was an error saving your log.');
      console.error('SaveLog error:', error);
    }
  };

   const remaining = (targetRange, used) => `${Math.max(0, targetRange[0] - used)}–${Math.max(0, targetRange[1] - used)}`;

  return (

     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <ScrollView
    ref={scrollRef}
    contentContainerStyle={styles.scrollContainer}
    keyboardShouldPersistTaps="handled"
  >

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
        <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text style={{ color: time ? '#000' : '#aaa' }}>
          {time || 'Select a time'}
        </Text>
          </TouchableOpacity>
           <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />

       {/* Fuel Goal Section */}
<View style={styles.plateCard}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={styles.plateText}>📦 Fuel Goal for Today</Text>
    <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
      <Text style={styles.infoIcon}>ℹ️</Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.plateSubtext}>Based on your last workout</Text>

  <Text style={styles.portionText}>
  🍞 {convertPortionsToTimes([
      Math.max(0, dailyTargets.carbs[0] - (dailyConsumed.carbs + carbCount)),
      Math.max(0, dailyTargets.carbs[1] - (dailyConsumed.carbs + carbCount))
    ])}
  {"\n"}
  🍗 {convertPortionsToTimes([
      Math.max(0, dailyTargets.protein[0] - (dailyConsumed.protein + proteinCount)),
      Math.max(0, dailyTargets.protein[1] - (dailyConsumed.protein + proteinCount))
    ])}
  {"\n"}
  🥦 {convertPortionsToTimes([
      Math.max(0, dailyTargets.color[0] - (dailyConsumed.color + colorCount)),
      Math.max(0, dailyTargets.color[1] - (dailyConsumed.color + colorCount))
    ])}
</Text>

  {showTooltip && (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>
        Your daily portion targets are based on your last workout. Longer or harder workouts increase your fuel needs. Aim to meet these goals throughout the day. Remember, these numbers are suggestions and you should always listen to your body and fuel for YOU.
      </Text>
    </View>
  )}

  {/* Dynamic food examples */}
  <View style={{ marginTop: 8 }}>
    {(() => {
      const exampleFoods = {
        easy: {
          carbs: ['toast', 'fruit', 'crackers'],
          protein: ['eggs', 'yogurt', 'cottage cheese'],
          color: ['berries', 'carrots', 'cucumber']
        },
        moderate: {
          carbs: ['oatmeal', 'rice', 'banana'],
          protein: ['chicken', 'tofu', 'Greek yogurt'],
          color: ['spinach', 'peppers', 'apple']
        },
        hard: {
          carbs: ['pasta', 'bagel', 'rice bowl'],
          protein: ['steak', 'chicken thigh', 'protein shake'],
          color: ['broccoli', 'sweet potato', 'mixed veggies']
        }
      };

      const currentType = estimatePlateType ? estimatePlateType([]) : 'moderate';
      const foodSet = exampleFoods[currentType] || exampleFoods.moderate;

      return (
        <>
          <Text style={styles.exampleLabel}>🍞 Carbs = {foodSet.carbs.join(', ')}</Text>
          <Text style={styles.exampleLabel}>🍗 Protein = {foodSet.protein.join(', ')}</Text>
          <Text style={styles.exampleLabel}>🥦 Color = {foodSet.color.join(', ')}</Text>
        </>
      );
    })()}
  </View>
</View>

{/* Portion Counter */}
<View style={styles.portionCounterBox}>
  <View style={styles.row}>
    <Text style={styles.label}>How many portions of each did you eat?</Text>
    <TouchableOpacity onPress={() => setShowPortionTooltip(!showPortionTooltip)}>
      <Text style={styles.infoIcon}>ℹ️</Text>
    </TouchableOpacity>
  </View>
  {showPortionTooltip && (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>
        These numbers do not need to be exact. If your meal was majority carbs, add 2 or 3 of amount of portions. If your meal was low in color, just add 1. 
        This section helps to prevent underfueling and make sure you are not only eating the right kinds of food, but enough food in general. 

      </Text>
    </View>
  )}

  {/* Portion Counters */}
  <View style={styles.counterRow}>
   
    <Text>🍞 Carbs:</Text>
    <TouchableOpacity onPress={() => setCarbCount(c => Math.max(0, c - 1))}><Text style={styles.counterButton}>−</Text></TouchableOpacity>
    <Text>{carbCount}</Text>
    <TouchableOpacity onPress={() => setCarbCount(c => c + 1)}><Text style={styles.counterButton}>＋</Text></TouchableOpacity>
  </View>
   
   

  <View style={styles.counterRow}>
    <Text>🍗 Protein:</Text>
    <TouchableOpacity onPress={() => setProteinCount(p => Math.max(0, p - 1))}><Text style={styles.counterButton}>−</Text></TouchableOpacity>
    <Text>{proteinCount}</Text>
    <TouchableOpacity onPress={() => setProteinCount(p => p + 1)}><Text style={styles.counterButton}>＋</Text></TouchableOpacity>
  </View>

  <View style={styles.counterRow}>
    <Text>🥦 Color:</Text>
    <TouchableOpacity onPress={() => setColorCount(c => Math.max(0, c - 1))}><Text style={styles.counterButton}>−</Text></TouchableOpacity>
    <Text>{colorCount}</Text>
    <TouchableOpacity onPress={() => setColorCount(c => c + 1)}><Text style={styles.counterButton}>＋</Text></TouchableOpacity>
  </View>
</View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Briefly describe what you ate..."
          value={description}
          onChangeText={setDescription}
          
        />

        {/*Tags */}
        <Tags reset={resetTags} onChangeTags={setTags}/>

        {/* How did you feel */}
        <View style={styles.row}>
        <Text style={styles.label}>How did you feel after eating?</Text>
        <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
      <Text style={styles.infoIcon}>ℹ️</Text>
       </TouchableOpacity>
      </View>

      {showTooltip && (
      <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
        <View style={styles.tooltip}>
      <Text style={styles.tooltipText}>
        This helps us track how your meals relate to your energy. Choose the option that best reflects how you felt after eating.
      </Text>
      
    </View>
  </TouchableWithoutFeedback>
)}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
  row: {
  flexDirection: 'row',
  alignItems: 'center',
},
infoIcon: {
  marginLeft: 6,
  fontSize: 16,
  color: '#333',
},
tooltip: {
  backgroundColor: '#fff',
  borderColor: '#ccc',
  borderWidth: 1,
  padding: 8,
  borderRadius: 6,
  marginVertical: 6,
  maxWidth: 280,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
tooltipText: {
  fontSize: 13,
  color: '#333',
},
testButton: {
  backgroundColor: 'gray',
  padding: 10,
  marginVertical: 10,
  borderRadius: 5,
  alignItems: 'center',
},
portionText: {
  fontSize: 14,
  marginTop: 4,
  fontWeight: '600',
},
portionCounterBox: {
  backgroundColor: '#f1f1f1',
  padding: 10,
  borderRadius: 6,
  marginBottom: 15,
},
counterRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 5,
},
counterButton: {
  fontSize: 20,
  paddingHorizontal: 10,
  color: '#444',
},
exampleLabel: {
  fontSize: 12,
  color: '#333',
  marginTop: 2,
},scrollContainer: {
    flexGrow: 1,
    paddingBottom:50,
  },

});
