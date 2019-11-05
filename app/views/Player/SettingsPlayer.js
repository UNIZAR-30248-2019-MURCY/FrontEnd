import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from 'react-navigation';
import {removeItem} from "../../services/AsyncStorage/remove";

export default class SettingsPlayer extends Component {

    constructor(props) {
        super(props);
        this.signOff = this.signOff.bind(this);
    }


    signOff() {
        removeItem('token')
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
                        className='request-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Request to be Editor"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            this.props.navigation.navigate('Request');
                        }}/>
                    <Button
                        className='editor-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Editor Mode"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            const toEditor = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Editor'})],
                            });
                            this.props.navigation.dispatch(toEditor);
                        }}/>
                    <Button
                        className='reviewer-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Reviewer Mode"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            const toEditor = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Reviewer'})],
                            });
                            this.props.navigation.dispatch(toEditor);
                        }}/>
                </View>
                <View style={styles.buttonSO}>
                    <Button
                        className='signoff-button'
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
        //justifyContent: 'center',
        alignItems: 'center',
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