import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a log (food or workout) to the correct key based on type property
export const saveLog = async (log) => {
  try {
    const key = log.type === 'food' ? 'FOOD_LOGS' : 'WORKOUT_LOGS';
    const existing = await AsyncStorage.getItem(key);
    const logs = existing ? JSON.parse(existing) : [];

    logs.push({ ...log, timestamp: new Date().toISOString() });
    await AsyncStorage.setItem(key, JSON.stringify(logs));
    console.log('saveLog success:', log);
  } catch (error) {
    console.error('saveLog error:', error);
    throw error;
  }
};

// Get logs by type ('food' or 'workout')
export const getLogs = async (type) => {
  try {
    const key = type === 'food' ? 'FOOD_LOGS' : 'WORKOUT_LOGS';
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading logs:', error);
    return [];
  }
};