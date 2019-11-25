import { AsyncStorage } from 'react-native';

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('data removed');
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const removeAll= async () => {
    try {
        await AsyncStorage.clear();
        console.log('all data removed');
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

