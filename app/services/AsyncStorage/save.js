import { AsyncStorage } from 'react-native';

export const saveData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log('data stored');
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};
