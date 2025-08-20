import AsyncStorage from '@react-native-async-storage/async-storage';

// Save a log (food or workout) to the correct key based on type property
export const saveLog = async (log) => {
  try {
    const key = log.type === 'food' ? 'FOOD_LOGS' : 'WORKOUT_LOGS';
    const existing = await AsyncStorage.getItem(key);
    const logs = existing ? JSON.parse(existing) : [];

    const now = new Date();
    const dateKey = now.toLocaleDateString('en-CA'); // YYYY-MM-DD local time

    logs.push({
      ...log,
      timestamp: now.toISOString(), // keep full ISO for exact time
      dateKey,                      // add local date key for filtering
    });

    await AsyncStorage.setItem(key, JSON.stringify(logs));
    console.log('✅ saveLog success');
  } catch (e) {
    console.error('❌ saveLog error:', e);
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

// 🆕 Save or update a wellness log by date
export const saveWellnessLog = async (entry) => {
  try {
    const key = 'wellnessLogs';
    const existing = await AsyncStorage.getItem(key);
    const logs = existing ? JSON.parse(existing) : [];

    // Replace log if already exists for the same date
    const updatedLogs = [...logs.filter(log => log.date !== entry.date), entry];

    await AsyncStorage.setItem(key, JSON.stringify(updatedLogs));
    console.log('Wellness log saved');
  } catch (e) {
    console.error('saveWellnessLog error:', e);
  }
};

// 🆕 Get all wellness logs
export const getWellnessLogs = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('wellnessLogs');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('getWellnessLogs error', e);
    return [];
  }
};

