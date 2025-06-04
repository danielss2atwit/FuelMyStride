import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostWorkout from './screens/PostWorkout';
import AppNavigator from './navigation/AppNavigator';
import OpeningPage from './screens/OpeningPage';
import LoginPage from './screens/LoginPage';
import CreateAccount from './screens/CreateAccount';
import CreateAccount2 from './screens/CreateAccount2';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}
      initialRouteName="Opening">
         <Stack.Screen name="Opening" component={OpeningPage} />
         <Stack.Screen name="Login" component={LoginPage} />
         <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="CreateAccount2" component={CreateAccount2} />
        <Stack.Screen name="MainTabs" component={AppNavigator}/>
        <Stack.Screen name="PostWorkout" component={PostWorkout}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



