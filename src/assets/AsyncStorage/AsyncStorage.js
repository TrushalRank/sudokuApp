import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromAsync = async (id) => {
  const data = await AsyncStorage.getItem(id);
  return data;
};

export const setDataToAsync = async (id, param) => {
  await AsyncStorage.setItem(id, param);
};

