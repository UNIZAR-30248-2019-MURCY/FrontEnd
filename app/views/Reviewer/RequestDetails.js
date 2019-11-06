import React, {Component} from 'react';
import {AsyncStorage, FlatList, StyleSheet, TextInput, View,} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements';

export default class RequestDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: false
        }
    }
    componentDidMount() {
        if (this.props.navigation) {
            this.setState({workflow: this.props.navigation.getParam('workflow', 'default value')});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.lastName) {
            this.setState({lastName:nextProps.navigation.state.params.lastName});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Details</Text>
                </View>

                <View style={styles.containerRequest}>
                    <Text h4>{this.state.workflow.title}</Text>
                    <Text style={styles.containerRequestDetails}>
                        Description: {this.state.workflow.description}
                        {'\n'}{'\n'}
                        Status: {this.state.workflow.status}
                    </Text>
                    <View style={styles.containerButtons}>
                        <Button
                            buttonStyle={styles.button}
                            title="Accept"
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}/>

                        <Button
                            buttonStyle={styles.buttonDen}
                            title="Deny"
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //justifyContent: 'center',
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerRequest: {
        flex: 1,
        alignItems: 'center',
        padding: 25
    },
    containerRequestDetails: {
        flex: 1,
        marginTop: 25,
        fontSize: 18,
        color: 'grey',
    },

    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    buttonDen: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    },
    containerButtons: {
        flexDirection: 'row'
    },

})
