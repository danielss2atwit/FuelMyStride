import React from 'react';
import { View,StyleSheet, ScrollView} from 'react-native';
import InsightsHeader from '../insightscomponents/InsightsHeader';
import Insights from '../insightscomponents/Insights';
import PastLogs from '../insightscomponents/PastLogs';

const InsightsPastLogs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <InsightsHeader />
      <Insights />
      <PastLogs />
   
    </ScrollView>
  );
};

const styles =StyleSheet.create({
  container:{
    flexGrow: 1,
    backgroundColor: '#FCF5D9',
    padding: 20,
    paddingBottom: 50,
    
  },
  
})

export default InsightsPastLogs;
