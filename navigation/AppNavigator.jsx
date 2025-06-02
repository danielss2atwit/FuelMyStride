import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LogFood from '../screens/LogFood';
import LogWorkout from '../screens/LogWorkout';
import InsightsPastLogs from '../screens/InsightsPastLogs';
import Settings from '../screens/Settings';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={size} color={color} />;
          }else if (route.name === 'Log Food') {
            return <MaterialCommunityIcons name="food" size={size} color={color} />;
          } else if (route.name === 'Log Workout') {
            return <Ionicons name="barbell-outline" size={size} color={color} />;
          } else if (route.name === 'Insights') {
            return <FontAwesome5 name="chart-line" size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <Ionicons name="settings-outline" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Log Food" component={LogFood} />
      <Tab.Screen name="Log Workout" component={LogWorkout} />
      <Tab.Screen name="Insights" component={InsightsPastLogs} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
