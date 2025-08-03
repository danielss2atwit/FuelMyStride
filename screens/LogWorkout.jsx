import React, {useRef, useState} from 'react';
import { StyleSheet, View,Alert,TouchableOpacity,Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderWorkout from '../workoutcomponents/HeaderWorkout';
import WorkoutInput from '../workoutcomponents/WorkoutInput';
import WorkoutRanking from '../workoutcomponents/WorkoutRanking';
import Journal from '../workoutcomponents/Journal';
import { saveLog } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LogWorkout = ({navigation}) => {

   const hungerOptions = [
    { label: 'Full, had sufficient energy', icon: '🍽️' },
    { label: 'Moderate, got harder towards the end', icon: '🍜' },
    { label: 'Empty, low energy throughout', icon: '🥄' },
  ];

  const scrollRef = useRef(null);

const initialWorkoutData = {
    selectedTag: null,
    time: '',
     duration: { hours: '0', minutes: '0', seconds: '0' },
    distance: { whole: '0', decimal: '0', unit: 'mi' },
    pace: { minutes: '0', seconds: '0', unit: 'mi' },
    ranking: null,
    journal: '',
  };

  const [workoutData,setWorkoutData] = useState(initialWorkoutData);

   const updateField = (field, value) => {
    setWorkoutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  

  const handleSave = async () => {
    const { selectedTag, time, duration, distance, pace, ranking, journal } = workoutData;

    const now = new Date();
    const formattedNow = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    });
    const log = {
      type: 'workout',
      workoutType: selectedTag || 'N/A',
      time: time || formattedNow,
      duration,
      distance,
      pace,
      intensity: hungerOptions[ranking]?.label || 'N/A',
      journal: journal || '',
      timestamp: now.toISOString(),
    };

    try {
      await saveLog(log);
      Alert.alert('Workout saved!');
      setWorkoutData(initialWorkoutData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error saving workout', error.message);
    }
  };

  const readLogs = async () => {
  try {
    const foodLogsRaw = await AsyncStorage.getItem('FOOD_LOGS');
    const workoutLogsRaw = await AsyncStorage.getItem('WORKOUT_LOGS');

    const foodLogs = foodLogsRaw ? JSON.parse(foodLogsRaw) : [];
    const workoutLogs = workoutLogsRaw ? JSON.parse(workoutLogsRaw) : [];

    console.log('🍽️ Food Logs:', foodLogs);
    console.log('🏋️ Workout Logs:', workoutLogs);
  } catch (error) {
    console.error('❌ Error reading logs:', error);
  }
};
  
  
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
      ref={(ref) => (scrollRef.current = ref)}
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderWorkout />
        <WorkoutInput data={workoutData} updateField={updateField}/>
        <WorkoutRanking selectedIndex={workoutData.ranking} onSelect={(val) => updateField('ranking',val)}/>
        <Journal value={workoutData.journal} onChangeText={(text) => updateField('journal',text)} navigation={navigation} scrollRef={scrollRef}/>

         {/* ✅ Submit button is here now */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Submit Workout</Text>
        </TouchableOpacity>
       
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LogWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede6fb',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom:50,
  },
  button: {
    backgroundColor: '#822f88',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});