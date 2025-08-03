import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LogFood from '../screens/LogFood';
import LogWorkout from '../screens/LogWorkout';
import InsightsPastLogs from '../screens/InsightsPastLogs';
import Settings from '../screens/Settings';
import Wellness from '../screens/Wellness';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          }else if (route.name === 'Food') {
            return <MaterialCommunityIcons name="food" size={size} color={color} />;
          } else if (route.name === 'Workout') {
            return <Ionicons name="barbell-outline" size={size} color={color} />;
          } else if (route.name === 'Insights') {
            return <FontAwesome5 name="chart-line" size={size} color={color} />;
          } else if (route.name == 'Wellness'){
            return <Ionicons name="heart-outline" size={size} color={color} />;
          }else if (route.name === 'Settings') {
            return <Ionicons name="settings-outline" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Food" component={LogFood} />
      <Tab.Screen name="Workout" component={LogWorkout} />
      <Tab.Screen name="Wellness" component={Wellness} />
      <Tab.Screen name="Insights" component={InsightsPastLogs} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
