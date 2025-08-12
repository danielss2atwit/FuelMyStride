import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLogs, getWellnessLogs } from './utils/storage';
import { calculateTrainingLoad, getPortionRangesFromPlate } from './utils/FuelUtils';
import { PROMPT_VARIANTS } from './promptConfig';

const OPENAI_API_KEY = Constants.expoConfig.extra.openaiApiKey;
const CLAUDE_API_KEY = Constants.expoConfig.extra.claudeApiKey;

export const clearInsights = async () => {
  try {
    await AsyncStorage.removeItem('NUTRITION_INSIGHTS');
  } catch (error) {
    console.error('Error clearing insights:', error);
  }
};


export const getSavedInsights = async () => {
  try {
    const json = await AsyncStorage.getItem('NUTRITION_INSIGHTS');
    if (!json) return null;
    return JSON.parse(json);
  } catch (error) {
    console.error('Error fetching saved insights:', error);
    return null;
  }
};

export const saveInsightsToStorage = async (insights) => {
  try {
    await AsyncStorage.setItem('NUTRITION_INSIGHTS', JSON.stringify(insights));
  } catch (error) {
    console.error('Error saving insights:', error);
  }
};

export const shouldRefreshInsights = (lastGeneratedISO) => {
  if (!lastGeneratedISO) return true;
  const lastDate = new Date(lastGeneratedISO);
  const now = new Date();
  const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);
  return diffDays > 3;  // refresh every 3 days
};

export const generateNutritionInsights = async () => {
console.log('generateNutritionInsights started');
  try {
    let [foodLogs, workoutLogs, wellnessLogs] = await Promise.all([
      getLogs('FOOD_LOGS'),
      getLogs('WORKOUT_LOGS'),
      getWellnessLogs()
    ]);
    // Ensure arrays, even if storage returns undefined/null
    foodLogs = Array.isArray(foodLogs) ? foodLogs : [];
    workoutLogs = Array.isArray(workoutLogs) ? workoutLogs : [];
    wellnessLogs = Array.isArray(wellnessLogs) ? wellnessLogs : [];

    const recentLogs = foodLogs.slice(-7);
    const recentWellness = wellnessLogs.slice(-7);

    const portionRanges = getPortionRangesFromPlate(recentLogs);

    const wellnessFormatted = recentWellness.map(item => {
      return {
        date: item.date,
        hydration: item.hydration,
        mood: item.mood,
        energy: item.energy,
        soreness: item.soreness,
        sleep: item.sleep,
        sleepQuality: item.sleepQuality
      };
    });

    const foodLogsFormatted = formatFoodLogs(recentLogs);
    const workoutLogsFormatted = formatWorkoutLogs(workoutLogs);

    const insights = {
      insights: [],
      lastGenerated: new Date().toISOString(),
      hasEnoughData: foodLogsFormatted.length > 3
    };

    for (const key of Object.keys(PROMPT_VARIANTS)) {
      const customPrompt = PROMPT_VARIANTS[key]
        .replace('{{fuelGoal}}', JSON.stringify(portionRanges))
        .replace('{{foodLogs}}', JSON.stringify(foodLogsFormatted))
        .replace('{{workoutLogs}}', JSON.stringify(workoutLogsFormatted))
        .replace('{{wellnessLogs}}', JSON.stringify(wellnessFormatted));

      const start = Date.now();
      const aiResponse = await callOpenAIWithCustomPrompt(customPrompt);
      console.log(`AI raw response for prompt ${key}:`, aiResponse);
      const duration = Date.now() - start;
      console.log(`Prompt ${key} took ${duration}ms`);

      const filteredResponse = await callClaudeForFilter(aiResponse);
      console.log(`Filtered AI response for prompt ${key}:`, filteredResponse);

      const parsedInsights = parseInsights(filteredResponse);
      console.log(`Parsed insights for prompt ${key}:`, parsedInsights);

      insights.insights.push({
         promptVersion: 'A',
        sections: parsedInsights
      });
    }

    await AsyncStorage.setItem('NUTRITION_INSIGHTS', JSON.stringify(insights));
    return insights;

  } catch (error) {
    console.error('Error generating nutrition insights:', error);
    return {
      insights: [
        {
          promptVersion: "Error",
          sections: [{
            title: 'Error',
            content: 'Unable to generate insights. Please try again later.'
          }]
        }
      ],
      lastGenerated: new Date().toISOString(),
      hasEnoughData: false
    };
  }

};

function formatFoodLogs(logs =[]) {
  return logs.map(log => ({
    date: log.date,
    mealType: log.mealType,
    food: log.foodItems,
    portions: log.portions
  }));
}

function formatWorkoutLogs(logs = []) {
  return logs.flatMap(log => 
    (log.workouts || []).map(workout => ({
      date: log.date,
      type: workout.type,
      intensity: workout.intensity,
      duration: workout.duration,
      distance: workout.distance,
      pace: workout.pace
    }))
  );
}

async function callOpenAIWithCustomPrompt(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 300
    })
  });

  const data = await response.json();
  console.log('OpenAI API raw response:', data); // <-- Add this line
  return data?.choices?.[0]?.message?.content || '';
}

async function callClaudeForFilter(text) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 800,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: `Filter this text to remove hallucinated nutrition facts, keep it grounded, and clear:\n\n${text}`
        }
      ]
    })
  });

  const data = await response.json();
  return data?.content?.[0]?.text || '';
}

function parseInsights(rawText) {
  if (!rawText) return [];
  return rawText.split('\n\n').map(block => {
    const lines = block.trim().split('\n');
    return {
      title: lines[0] || '',
      content: lines.slice(1).join('\n') || ''
    };
  });
}



