import React, { useState,useCallback } from 'react';
import { useFocusEffect} from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native';
import { generateNutritionInsights, getSavedInsights, shouldRefreshInsights, saveInsightsToStorage } from '../InsightsService.jsx'; // Adjust path as needed

function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasEnoughData, setHasEnoughData] = useState(true);

  useFocusEffect(
  useCallback(() => {
    loadInsights(); // re-runs when screen is focused
  }, [])
);

  const loadInsights = async () => {
    try {
    setLoading(true);

    const TESTING_MODE = false; // Toggle this to false when done testing

    const saved = await getSavedInsights();

    if (!TESTING_MODE && saved && !shouldRefreshInsights(saved.lastGenerated)) {
      // Use saved insights
      setInsights(saved.insights);
      setHasEnoughData(saved.hasEnoughData);
    } else {
      // Force regenerate insights
      console.log('Generating new insights (forced refresh for testing)...');
      const newInsights = await generateNutritionInsights();
      setInsights(newInsights.insights);
      setHasEnoughData(newInsights.hasEnoughData);

      // Save the new insights
      await saveInsightsToStorage(newInsights);
    }
  } catch (error) {
    console.error('Error loading insights:', error);
    setInsights([
      "Keep logging your meals and workouts to get personalized insights!",
      "Try to be consistent with your tracking for the best results.",
      "Your nutrition insights will appear here as you build your data."
    ]);
    setHasEnoughData(false);
  } finally {
    setLoading(false);
  }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>Analyzing your nutrition patterns...</Text>
      </View>
    );
  }

return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {insights.map((insight, index) => {
        const [title, ...bodyParts] = insight.split('\n\n');
        const body = bodyParts.join('\n\n');

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{body}</Text>
          </View>
        );
      })}

      {!hasEnoughData && (
        <Text style={styles.dataHint}>
          💡 Log more meals and workouts for personalized AI insights!
        </Text>
      )}

      {hasEnoughData && (
        <Text style={styles.refreshHint}>
          🔄 Insights refresh every 3 days based on your latest data
        </Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#EAE2D8',
    marginBottom: 30,
    margin:30,
  },
  insight: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  more: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
    loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#8B4513',
  },
  dataHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 15,
    fontStyle: 'italic',
  },
  refreshHint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    marginTop: 10,
    fontStyle: 'italic',
  },
  scroll:{
    padding: 16,
  },
   card: {
    backgroundColor: '#FFF7F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default Insights