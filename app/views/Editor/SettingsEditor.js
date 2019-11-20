import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image, AsyncStorage,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {NavigationActions, StackActions} from "react-navigation";
import {removeAll, removeItem} from "../../services/AsyncStorage/remove";
import {retrieveItem} from "../../services/AsyncStorage/retrieve";

export default class SettingScreen extends Component {

    constructor(props) {
        super(props);
        this.signOff = this.signOff.bind(this);
        this.state = {
            reviewer: false,
            player: false
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
                    if(data.includes("USER")){
                        this.setState({player: true})
                    }
                    if(data.includes("REVIEWER")){
                        this.setState({reviewer: true})
                    }
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
                    {player}
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
