import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLogs } from './utils/storage';

const formatDateKey = (date) =>
  date.toISOString().split('T')[0]; // "YYYY-MM-DD"

export const generateDailyTip = async () => {
  const today = new Date();
  const todayKey = `TIP_${formatDateKey(today)}`;

  // Return cached tip if it exists for today
  const cached = await AsyncStorage.getItem(todayKey);
  if (cached) return cached;

  const foodLogs = await getLogs('FOOD_LOGS') || [];
  const workoutLogs = await getLogs('WORKOUT_LOGS') || [];

  // Get previous day's date
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const dateToLogsMap = {};

  // Group logs by date
  for (const log of [...foodLogs, ...workoutLogs]) {
    const logDate = new Date(log.timestamp);
    const key = formatDateKey(logDate);
    if (!dateToLogsMap[key]) {
      dateToLogsMap[key] = { food: [], workouts: [] };
    }
    if (log.description) {
      dateToLogsMap[key].food.push(log);
    } else {
      dateToLogsMap[key].workouts.push(log);
    }
  }

  let targetDate = formatDateKey(yesterday);

  // If no logs on yesterday, pick the most recent day with logs
  if (!dateToLogsMap[targetDate]) {
    const availableDates = Object.keys(dateToLogsMap).sort().reverse();
    targetDate = availableDates[0];
  }

  const logs = dateToLogsMap[targetDate];

  if (!logs || (logs.food.length === 0 && logs.workouts.length === 0)) {
    const fallback = "No recent logs found — try logging meals or workouts for personalized tips!";
    await AsyncStorage.setItem(todayKey, fallback);
    return fallback;
  }

  // Generate the tip
  const tip = await getOpenAITip(logs.food, logs.workouts, targetDate);
  const final = tip || "Stay consistent and hydrate today!";
  await AsyncStorage.setItem(todayKey, final);
  return final;
};

const getOpenAITip = async (foodLogs, workoutLogs, dateLabel) => {
  const API_KEY = Constants.expoConfig.extra?.openaiApiKey;

  const prompt = `
You're a helpful sports nutrition coach. Based on this runner's logs from **${dateLabel}**, give ONE short, clear recommendation they can apply **today**.

• Keep it to 1–2 sentences.
• Be supportive and specific.
• Tie the advice to what they ate or how they trained.

Meals from ${dateLabel}:
${foodLogs.map(log => `• ${log.description || 'Meal'} | ${log.mealType || 'Unknown'} | Feeling: ${log.feeling || 'N/A'}`).join('\n')}

Workouts from ${dateLabel}:
${workoutLogs.map(log => `• ${log.workoutType || 'Workout'} | ${log.distance?.whole || 0}mi | Notes: ${log.journal || 'None'}`).join('\n')}

Respond with just the tip, no title.
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
};