import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,Button } from 'react-native';
import { generateDailyTip } from '../TipService'; // Adjust path

function TipOfDay() {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);

 const fetchTip = async () => {
    setLoading(true);
    const dailyTip = await generateDailyTip(/* forceRefresh = true */);
    setTip(dailyTip);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchTip() {
      const dailyTip = await generateDailyTip();
      setTip(dailyTip);
      setLoading(false);
    }
    fetchTip();
  }, []);

  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipTitle}>⭐Tip of the Day⭐</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#888" />
      ) : (
        <Text style={styles.tipText}>{tip}</Text>
      )}
      
      {/*<Button title="🔄 Refresh Tip" onPress={fetchTip} /> */}
    </View>
    
  );
  
}

export default TipOfDay;

const styles = StyleSheet.create({
  tipBox: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginBottom: 10,
    width: 300,
    height: 160,
    alignSelf: 'center',
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  tipText: {
    textAlign: 'center',
  },
});