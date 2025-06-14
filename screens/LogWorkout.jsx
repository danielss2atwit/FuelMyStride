import React, {useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderWorkout from '../workoutcomponents/HeaderWorkout';
import WorkoutInput from '../workoutcomponents/WorkoutInput';
import WorkoutRanking from '../workoutcomponents/WorkoutRanking';
import Journal from '../workoutcomponents/Journal';
import { saveLog } from '../utils/storage';

const LogWorkout = ({navigation}) => {
  const scrollRef = useRef(null);
  
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
        <WorkoutInput />
        <WorkoutRanking />
        <Journal navigation={navigation} scrollRef={scrollRef}/>
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
});