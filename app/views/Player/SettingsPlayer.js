import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from 'react-navigation';
import {removeAll, removeItem} from "../../services/AsyncStorage/remove";
import {retrieveItem} from "../../services/AsyncStorage/retrieve";
import {getRequestEdit} from "../../services/user/userFuncs";

export default class SettingsPlayer extends Component {

    constructor(props) {
        super(props);
        this.signOff = this.signOff.bind(this);
        this.state = {
            editor: false,
            reviewer: false
        }
    }

    signOff() {
        removeAll()
            .then((r) => {
                if (r) {
                    this.props.navigation.navigate('Auth');
                }
            });
    }
    componentDidMount() {
        retrieveItem('role')
            .then(data => {
                console.log(data)
                if(data){
                    if(data.includes("REVIEWER")){
                        this.setState({reviewer: true})
                    }
                    if(data.includes("EDITOR")){
                        this.setState({editor: true})
                    }
                }
            })
    }

    render() {
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

        let reviewer = (
            this.state.reviewer ?
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
                    }}/> :
                <View></View>
        );
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
                    {editor}
                    {reviewer}
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
