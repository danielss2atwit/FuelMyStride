import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Settings = () => {
  const navigation = useNavigation();

  const routeMap = {
  "Account Info": "AccountInfo",
  "Update Preferences": "UpdatePreferences",
  "Change Password": "ChangePassword",
  "Add Race or Goal": "AddRaceGoal",
  "Set Daily Reminders": "SetReminders",
  "Notifications": "Notifications",
  "Appearance": "Appearance",
  "Data & Sync": "DataSync",
  "FAQs": "FAQs",
  "Contact Support": "Support",
  "Privacy Policy": "PrivacyPolicy",
};


  const Section = ({ title, options }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((opt, index) => (
        <TouchableOpacity key={index} style={styles.button}
        onPress={()=> {
          const route = routeMap[opt];
          if(route){
            navigation.navigate(route);
          }
        }}>
          <Text style={styles.buttonText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.logo}>🏃‍♂️</Text>
      <Text style={styles.title}>Settings</Text>

      <Section 
        title="Account" 
        options={["Account Info", "Update Preferences", "Change Password"]} 
      />

      <Section 
        title="Tracking Goals" 
        options={["Add Race or Goal", "Set Daily Reminders"]} 
      />

      <Section 
        title="App Settings" 
        options={["Notifications", "Appearance", "Data & Sync"]} 
      />

      <Section 
        title="Help & Support" 
        options={["FAQs", "Contact Support", "Privacy Policy"]} 
      />

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, { color: 'white' }]}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef1de',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#f4a21c',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    marginTop: 20,
  },
});

export default Settings;

