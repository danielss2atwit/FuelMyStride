import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native';
import { generateNutritionInsights, getSavedInsights, shouldRefreshInsights, saveInsightsToStorage } from '../InsightsService.jsx'; // Adjust path as needed

function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasEnoughData, setHasEnoughData] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadInsights();
    }, [])
  );

  const loadInsights = async () => {
    try {
      setLoading(true);

      const TESTING_MODE = true; // Toggle this to false when done testing

      const saved = await getSavedInsights();

      if (!TESTING_MODE && saved && !shouldRefreshInsights(saved.lastGenerated)) {
        setInsights(saved.insights);
        setHasEnoughData(saved.hasEnoughData);
      } else {
        console.log('Generating new insights (forced refresh for testing)...');
        const newInsights = await generateNutritionInsights();
        setInsights(newInsights.insights);
        setHasEnoughData(newInsights.hasEnoughData);
        await saveInsightsToStorage(newInsights);
      }
    } catch (error) {
      console.error('Error loading insights:', error);
      setInsights([]);
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
      {insights.length === 0 && (
        <Text style={styles.noDataText}>
          💡 Keep logging meals and workouts to see personalized insights here!
        </Text>
      )}

{insights.map((insight, i) => (
  <View key={i} style={styles.insightBlock}>
    {insight.sections.map((section, j) => {
      // Clean up title
      let cleanTitle = section.title
        .replace(/\*\*/g, "")
        .replace(/[#⭐]/g, "")
        .trim();

      // Clean up content (safer)
      let cleanContent = section.content
        // Remove Claude disclaimers
        .replace(/^here.*removed\.*\s*/i, "")
        // Only strip list markers at the start of a line (but keep the text after)
        .replace(/^\s*(\d+[\.\)]|-)\s*/gm, "• ")
        // Remove leftover markdown
        .replace(/\*\*/g, "")
        .replace(/[#⭐]/g, "")
        .trim();

      // Assign emoji
      let emoji = "";
      if (cleanTitle.toLowerCase().includes("performance")) emoji = "🏃‍♂️";
      else if (cleanTitle.toLowerCase().includes("recovery")) emoji = "🛌";
      else if (cleanTitle.toLowerCase().includes("trend") || cleanTitle.toLowerCase().includes("suggestion")) emoji = "📈";
      else if (cleanTitle.toLowerCase().includes("tips")) emoji = "💡";
      else if (cleanTitle.toLowerCase().includes("checklist")) emoji = "✅";
      else if (cleanTitle.toLowerCase().includes("adjust")) emoji = "⚖️";

      return (
        <View key={j} style={styles.card}>
          <Text style={styles.cardTitle}>
            {emoji} <Text style={{ fontWeight: "bold" }}>{cleanTitle}</Text>
          </Text>
          <Text style={styles.cardBody}>{cleanContent}</Text>
        </View>
      );
    })}
  </View>
))}

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