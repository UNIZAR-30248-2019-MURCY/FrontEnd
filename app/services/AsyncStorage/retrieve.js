import { AsyncStorage } from 'react-native';

export const retrieveItem = async (key) => {
    let data ='';
    try {
        data = await AsyncStorage.getItem(key)
        console.log(data)
    } catch (error) {
        console.log(error.message);
    }
    return data;
}
