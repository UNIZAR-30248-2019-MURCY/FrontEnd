import { AsyncStorage } from 'react-native';

export const retrieveItem = async (key) => {
    let data ='';
    try {
        let dataStored = await AsyncStorage.getItem(key)
        data = JSON.parse(dataStored).token;
        console.log('retrievedItem')
    } catch (error) {
        console.log(error.message);
    }
    return data;
}
