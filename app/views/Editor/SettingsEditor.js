import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from "react-navigation";

export default class SettingScreen extends Component {

    constructor(props) {
        super(props);
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
    }

})
