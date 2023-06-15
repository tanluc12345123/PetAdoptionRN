import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  setData: async (key: string, data: string) => {
    AsyncStorage.setItem(key, data);
  },
  getData: async (key: string) => {
    return AsyncStorage.getItem(key);
  },
};
