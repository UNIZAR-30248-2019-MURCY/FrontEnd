import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Text,
    ActivityIndicator
} from 'react-native'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logInUser, userInfo} from "../../services/user/userFuncs";
import {saveData} from "../../services/AsyncStorage/save";
import {NavigationActions, StackActions} from "react-navigation";


export default class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: '',
            error: false,
            userData: '',
            loading: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({loading: true})
            this.setState({error: false})
            logInUser(this.state.username, this.state.password)
                .then((data) => {
                    saveData('token', data).then(r =>
                        userInfo(data.jsonWebToken).then((dataUser) => {
                                saveData('role', dataUser.role).then(r =>
                                        console.log(dataUser.role),
                                    this.setState({loading: false}),
                                    this.props.navigation.navigate('App')
                                )
                            }
                        )
                            .catch((error) => {
                                this.setState({error: error.message}),
                                    this.setState({loading: false})
                            })
                    );
                })
                .catch((error) => {
                    this.setState({error: error.message}),
                        this.setState({loading: false})
                });
        } else {
            this.setState({error: 'Introduzca todos los campos'})
        }
    }

    render() {
        let showErr = (
            this.state.error ?
                <View style={styles.error} className='errorShow'>
                    <Text style={{color: 'red'}}>
                        {this.state.error}
                    </Text>
                </View> :
                <View></View>
        );
        let showLoading = (
            this.state.loading ?
                <View style={[styles.containerLoading]}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View></View>
        );

        return (

            <View style={styles.container}>
                <View style={styles.cross}>
                    <Button
                        className='close-button'
                        type="clear"
                        icon={
                            <Icon
                                name="times"
                                size={30}
                                color="grey"
                            />
                        }
                        onPress={() => {
                            this.props.navigation.navigate('AuthLoading')
                        }
                        }
                    />
                </View>

                <View style={styles.login}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/murcy.png')}
                    />
                    <TextInput
                        className='userInput'
                        style={styles.input}
                        placeholder='Username'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        className='passInput'
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onSubmitEditing={() => {
                            this.handleSubmit()
                        }}
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    {showErr}
                    {showLoading}
                    <Button
                        className='login-button'
                        buttonStyle={styles.button}
                        title="Log In"
                        onPress={() => {
                            this.handleSubmit()
                        }}/>
                    <Button
                        className='signup-button'
                        type="clear"
                        buttonStyle={styles.button2}
                        title="Sign Up"
                        titleStyle={{color: 'grey'}}
                        onPress={() => {
                            this.props.navigation.replace('SignUp');
                        }
                        }/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLoading: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    cross: {
        marginTop: 50,
        marginBottom: 40,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    login: {
        alignItems: 'center',
    },
    logo: {
        marginBottom: 30,
        padding: 8,
        width: 100,
        height: 100
    },
    input: {
        width: 300,
        height: 55,
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

    },

})
