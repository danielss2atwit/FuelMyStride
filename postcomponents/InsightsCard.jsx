import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function InsightsCard({ insight }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Insights</Text>
      <Text style={styles.text}>{insight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
});

export default InsightsCard;