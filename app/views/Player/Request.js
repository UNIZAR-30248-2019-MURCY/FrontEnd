import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, TextInput, View,} from 'react-native'
import {Button, Text} from 'react-native-elements';
import {getRequestEdit, requestEditor, editRequestEditor} from "../../services/user/userFuncs";
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";

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
            editing: false,
            reRequest: false,
            loading: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchLastRequest = this.searchLastRequest.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    searchLastRequest() {
        while (this.state.workflow.nextWorkflow !== null) {
            this.setState({request: this.state.workflow.nextWorkflow})
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data).jsonWebToken})
                getRequestEdit(this.state.token)
                    .then((request) => {
                        if(request)
                        {
                            this.setState({request: request})
                            this.setState({workflow: request.workflow})
                            this.searchLastRequest()
                        }
                        this.setState({loading: false})
                    })
                    .catch((error) => {
                        this.setState({errorGettingReq: error.message}),
                            this.setState({loading: false})
                    })
            })
    }

    handleSubmit() {
        this.setState({loading: true})
        if (this.state.description !== '') {
            if (!this.state.editing) {
                requestEditor(this.state.description, this.state.token)
                    .then((data) => {
                        this.setState({loading: false})
                        this.props.navigation.replace('RequestConfirm');
                    })
                    .catch((error) => {
                        this.setState({errorForm: error.message}),
                        this.setState({loading: false})
                    })
            } else {
                editRequestEditor(this.state.description, this.state.token)
                    .then((data) => {
                        this.setState({loading: false})
                        this.props.navigation.replace('RequestConfirm');
                    })
                    .catch((error) => {
                        this.setState({errorForm: error.message}),
                            this.setState({loading: false})
                    })
            }
        } else {
            this.setState({loading: false})
            this.setState({errorForm: 'Introduzca todos los campos'})
        }

    }

    render() {
        let showErr = (
            this.state.errorForm ?
                <View style={styles.error} className='errorShow'>
                    <Text style={{color: 'red'}}>
                        {this.state.errorForm}
                    </Text>
                </View> :
                <View></View>
        );

        let showLoading = (
            <View style={ styles.horizontal}>
                <ActivityIndicator animating={this.state.loading} size="large" color="grey" />
            </View>
        );

        let reqNotExist = (
            <View style={styles.containerRequest}  className='editCreateReq'>
                <TextInput
                    className='descriptionInput'
                    style={styles.input}
                    multiline={true}
                    placeholder='Description'
                    autoCapitalize="none"
                    placeholderTextColor='darkgrey'
                    onChangeText={val => this.onChangeText('description', val)}
                />

                {showErr}

                <Button
                    className='send-button'
                    buttonStyle={styles.button}
                    title="Send"
                    onPress={() => {
                        this.handleSubmit()
                    }}/>

                <Button
                    className='cancel-button'
                    type="clear"
                    buttonStyle={styles.button2}
                    title="Cancel"
                    titleStyle={{color: 'grey'}}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }
                    }/>
            </View>
        );

        let editReq = (
            !this.state.editing ?
                <View style={styles.containerEdit} className='editShow'>
                    <Button
                        className='edit-button'
                        buttonStyle={styles.buttonEdit}
                        title="Edit request"
                        onPress={() => {
                            this.setState({editing: true})
                        }}/>
                </View>
                : reqNotExist
        );

        let reReq = (
            !this.state.reRequest ?
                <View style={styles.containerEdit} className='reReqShow'>
                    <Button
                        className='reReq-button'
                        buttonStyle={styles.buttonEdit}
                        title="Request Again"
                        onPress={() => {
                            this.setState({reRequest: true})
                        }}/>
                </View>
                : reqNotExist
        );

        let reqExist = (
            this.state.request.closed && !this.state.request.approved ?
                <View className='requesDenied'>
                    <Text h4>A request has been denied</Text>
                    <Text style={styles.containerRequestExistContent}>
                        Description: {this.state.workflow.description}
                        {'\n'}{'\n'}
                        Status: {this.state.workflow.status}
                    </Text>
                    {reReq}
                </View>
                :
                this.state.request.closed && this.state.request.approved ?
                    <View className='requesApproved'>
                        <Text h4>A request has been accepted</Text>
                        <Text style={styles.containerRequestExistContent}>
                            Description: {this.state.workflow.description}
                            {'\n'}{'\n'}
                            Status: {this.state.workflow.status}
                        </Text>
                    </View >
                    : <View style={styles.containerInfo} className='editMode'>
                        <Text h4>A request already exists</Text>
                        <Text style={styles.containerRequestExistContent}>
                            Description: {this.state.workflow.description}
                            {'\n'}{'\n'}
                            Status: {this.state.workflow.status}
                        </Text>
                        {editReq}
                    </View>
        );

        let show = (
            this.state.errorGettingReq ?
                <View style={styles.error} className='errorGettingReq'>
                    <Text style={{color: 'red'}}>
                        {this.state.errorGettingReq}
                    </Text>
                </View> :
                !this.state.loading ?
                    this.state.request ?
                        <View style={styles.containerRequestExist} className='requestShow'>
                            {reqExist}
                                <Button
                                    className='return-button'
                                    type="clear"
                                    buttonStyle={styles.button2}
                                    title="Return"
                                    titleStyle={{color: 'grey'}}
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }
                                    }/>
                        </View>
                     :reqNotExist
                : showLoading
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Request</Text>
                </View>
                <ScrollView>
                    {show}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 50,
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerRequest: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    containerRequestExist: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    containerRequestExistContent: {
        textAlign: 'center',
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
        width: 250,
        height: 90,
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
    containerEdit: {
        marginTop: 30,
        alignItems: 'center',
    },
    buttonEdit: {
        width: 150,
        height: 50,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    containerInfo: {
        alignItems: 'center',
    },

})
