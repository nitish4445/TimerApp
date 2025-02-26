import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTimers = async (timers) => {
  const jsonValue = JSON.stringify(timers);
  await AsyncStorage.setItem('timers', jsonValue);
};

export const loadTimers = async () => {
  const jsonValue = await AsyncStorage.getItem('timers');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const saveHistory = async (history) => {
  const jsonValue = JSON.stringify(history);
  await AsyncStorage.setItem('history', jsonValue);
};

export const loadHistory = async () => {
  const jsonValue = await AsyncStorage.getItem('history');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const logCompletedTimer = async (timer) => {
  const history = await loadHistory();
  const newHistory = [
    ...history,
    {
      name: timer.name,
      completionTime: new Date().toISOString(),
    },
  ];
  await saveHistory(newHistory);
};