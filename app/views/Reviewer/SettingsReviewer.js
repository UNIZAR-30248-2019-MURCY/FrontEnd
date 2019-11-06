import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image, AsyncStorage,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from "react-navigation";
import {removeItem} from "../../services/AsyncStorage/remove";
import {retrieveItem} from "../../services/AsyncStorage/retrieve";

export default class SettingsReviewer extends Component {

    constructor(props) {
        super(props);
        this.signOff = this.signOff.bind(this);
        this.state = {
            editor: false,
            player: false
        }
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

    componentDidMount() {
        retrieveItem('role')
            .then(data => {
                console.log(data)
                if(data.includes("USER")){
                    this.setState({player: true})
                }
                if(data.includes("EDITOR")){
                    this.setState({editor: true})
                }
            })
    }

    render() {

        let player = (
            this.state.player ?
                <Button
                    className='player-button'
                    type="clear"
                    buttonStyle={styles.button}
                    title="Player Mode"
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        const toEditor = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Player'})],
                        });
                        this.props.navigation.dispatch(toEditor);
                    }}/> :
                <View></View>
        );

        let editor = (
            this.state.editor ?
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
                    }}/> :
                <View></View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Settings</Text>
                </View>

                <View style={styles.containerSettings}>
                    {player}
                    {editor}
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
