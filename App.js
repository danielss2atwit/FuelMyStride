import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostWorkout from './screens/PostWorkout';
import AppNavigator from './navigation/AppNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="MainTabs" component={AppNavigator}/>
        <Stack.Screen name="PostWorkout" component={PostWorkout}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



