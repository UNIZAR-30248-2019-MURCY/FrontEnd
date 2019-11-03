import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, TextInput, View,} from 'react-native'
import {Button, Text} from 'react-native-elements';
import {getRequestEdit, requestEdit} from "../../services/user/userFuncs";

export default class Request extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            token: '',
            request: false,
            workflow: false,
            errorGettingReq: false,
            errorForm: false,
            notShow: true
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.retrieveItem = this.retrieveItem.bind(this);
        this.searchLastRequest = this.searchLastRequest.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    async retrieveItem(key) {
        try {
            console.log('retrieveItem')
            let data = await AsyncStorage.getItem(key)
            let token = JSON.parse(data).token;
            this.setState({token: token})
        } catch (error) {
            console.log(error.message);
        }
    }

    searchLastRequest() {
        while(this.state.workflow.nextWorkflow !== null){
            this.setState({request: this.state.workflow.nextWorkflow})
        }
    }


    componentDidMount() {
        this.retrieveItem('token')
            .then(r => {
                getRequestEdit(this.state.token)
                    .then((request) => {
                        this.setState({request: request})
                        this.setState({workflow: request.workflow})
                        this.setState({notShow: false})
                        this.searchLastRequest()
                    })
                    .catch((error) => {
                        this.setState({errorGettingReq: error.message})
                    })
            })
    }

    handleSubmit() {
        if (this.state.description !== '') {
            requestEdit(this.state.description, this.state.token)
                .then((data) => {
                    this.props.navigation.replace('RequestConfirm');
                })
                .catch((error) => {
                    this.setState({errorForm: error.message})
                })

        } else {
            this.setState({errorForm: 'Introduzca todos los campos'})
        }

    }

    render() {
        let showErr = (
            this.state.errorForm ?
                <View style={styles.error}>
                    <Text style={{color: 'red'}}>
                        {this.state.errorForm}
                    </Text>
                </View> :
                <View></View>
        );

        let showReq = (
            this.state.notShow || this.state.errorGettingReq ?
                <View style={styles.error}>
                    <Text style={{color: 'red'}}>
                        {this.state.errorGettingReq}
                    </Text>
                </View> :
                this.state.request ?
                    <View style={styles.containerRequestExist}>
                        <Text h4>A request already exists</Text>
                        <Text style={styles.containerRequestExistContent}>
                            Description: {this.state.workflow.description}
                            {'\n'}{'\n'}
                            Status: {this.state.workflow.status}
                        </Text>
                    </View> :
                    <View style={styles.containerRequest}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            placeholder='Description'
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('description', val)}
                        />

                        {showErr}

                        <Button
                            buttonStyle={styles.button}
                            title="Send"
                            onPress={() => {
                                this.handleSubmit()
                            }}/>

                        <Button
                            className='signup-button'
                            type="clear"
                            buttonStyle={styles.button2}
                            title="Cancelar"
                            titleStyle={{color: 'grey'}}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }
                            }/>
                    </View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Request</Text>
                </View>
                {showReq}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
        marginTop: 20,
    },
    containerRequestExist: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 30
    },
    containerRequestExistContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: 20,
        fontSize: 18,
        color: 'grey',
    },
    cross: {
        marginTop: 50,
        marginBottom: 40,
        marginRight: 10,
        alignItems: 'flex-end',
    },

    logo: {
        marginBottom: 30,
        padding: 8,
        width: 100,
        height: 100
    },
    input: {
        width: 300,
        height: 100,
        backgroundColor: 'whitesmoke',
        margin: 10,
        padding: 8,
        color: 'grey',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    },
    error: {
        margin: 10,
        alignItems: 'center',
    },

})
