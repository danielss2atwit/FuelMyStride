import React from 'react';
import { View,StyleSheet} from 'react-native';
import InsightsHeader from '../insightscomponents/InsightsHeader';
import Insights from '../insightscomponents/Insights';
import PastLogs from '../insightscomponents/PastLogs';

const InsightsPastLogs = () => {
  return (
    <View style={styles.container}>
      <InsightsHeader />
      <Insights />
      <PastLogs />
    </View>
  );
};

const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F6CFE1',
  }
})

export default InsightsPastLogs;
