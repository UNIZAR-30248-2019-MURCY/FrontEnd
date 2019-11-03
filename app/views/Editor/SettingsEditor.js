import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image, AsyncStorage,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from "react-navigation";

export default class SettingScreen extends Component {

    constructor(props) {
        super(props);
        this.removeToken = this.removeToken.bind(this);
        this.signOff = this.signOff.bind(this);
    }

    async removeToken() {
        try {
            await AsyncStorage.removeItem('token');
            return true;
        } catch (exception) {
            return false;
        }
    }

    signOff() {
        this.removeToken()
            .then((r) => {
                if (r) {
                    const toWelcome = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Welcome'})],
                    });
                    this.props.navigation.dispatch(toWelcome);
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Settings</Text>
                </View>

                <View style={styles.containerSettings}>
                    <Button
                        className='enter-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Player Mode"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            const toPlayer = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Player' })],
                            });
                            this.props.navigation.dispatch(toPlayer);
                        }}/>
                </View>

                <View style={styles.buttonSO}>
                    <Button
                        className='enter-button'
                        type="clear"
                        title="Sign off"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            this.signOff()
                        }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 20
    },
    containerTitle: {
        marginTop: 50,
        padding: 20
    },

    containerSettings: {
        padding: 20
    },
    button: {
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 20,
        color: 'grey'
    },
    buttonSO: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
    }

})
