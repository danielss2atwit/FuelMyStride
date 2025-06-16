import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a log (food or workout) to the correct key based on type property
export const saveLog = async (log) => {
   try {
    const key = log.type === 'food' ? 'FOOD_LOGS' : 'WORKOUT_LOGS';
    const existing = await AsyncStorage.getItem(key);
    const logs = existing ? JSON.parse(existing) : [];

    logs.push({ ...log, timestamp: new Date().toISOString() });
    await AsyncStorage.setItem(key, JSON.stringify(logs));
    console.log('saveLog success:');
  } catch (e) {
    console.error('saveLog error:', e);
    
  }
};

// Get logs by type ('food' or 'workout')
export const getLogs = async (key) => {
 try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('getLogs error', e);
    return [];
  }
};

export const clearLogs = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Cleared logs for key: ${key}`);
  } catch (error) {
    console.error('Failed to clear logs:', error);
  }
};