import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostWorkout from './screens/PostWorkout';
import AppNavigator from './navigation/AppNavigator';
import OpeningPage from './screens/OpeningPage';
import LoginPage from './screens/LoginPage';
import CreateAccount from './screens/CreateAccount';
import CreateAccount2 from './screens/CreateAccount2';

import AccountInfo from './screens/settingsscreens/AccountInfo';
import UpdatePreferences from './screens/settingsscreens/UpdatePreferences';
import ChangePassword from './screens/settingsscreens/ChangePassword';
import AddRaceGoal from './screens/settingsscreens/AddRaceGoal';
import SetReminders from './screens/settingsscreens/SetReminders';
import Notifications from './screens/settingsscreens/Notifications';
import Appearance from './screens/settingsscreens/Appearance';
import DataSync from './screens/settingsscreens/DataSync';
import FAQs from './screens/settingsscreens/FAQs';
import Support from './screens/settingsscreens/Support';
import PrivacyPolicy from './screens/settingsscreens/PrivacyPolicy';
import './TestAi.jsx'


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

         {/* ✅ Add Settings Subpages */}
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="UpdatePreferences" component={UpdatePreferences} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="AddRaceGoal" component={AddRaceGoal} />
        <Stack.Screen name="SetReminders" component={SetReminders} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Appearance" component={Appearance} />
        <Stack.Screen name="DataSync" component={DataSync} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}



