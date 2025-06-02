import { ScrollView,StyleSheet, View } from 'react-native';
import Header from '../homecomponents/Header'
import TipOfDay from '../homecomponents/TipOfDay';
import DailyView from '../homecomponents/DailyView';
import GoalCalendar from '../homecomponents/GoalCalendar';
import CountdownBox from '../homecomponents/CountdownBox'


function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
    <ScrollView>
      <Header />
      <TipOfDay />
      <DailyView />
      <View style={styles.count}>
      <GoalCalendar />
      <View style={styles.countdownContainer}>
      <CountdownBox />
      </View>
      </View>
      
     
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:'#FFF9F1',
  },
  count:{
  flexDirection: 'row',
  justifyContent: 'space-between', // or 'center' or 'flex-start'
  alignItems: 'flex-start',        // adjust vertically if needed
  paddingHorizontal: 10,
  
},
countdownContainer:{
  justifyContent: 'center',
  marginTop: 70, // tweak this value until visually centered
},


});

export default HomeScreen
