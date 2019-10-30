import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native'
import {Button, CheckBox } from 'react-native-elements';
import {signUpUser} from '../services/user/userFuncs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
            phone_number: '',
            checked: false,
            error: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        if (this.state.username !== '' && this.state.password !== '' && this.state.email !== '') {
            signUpUser(this.state.username, this.state.password, this.state.email)
                .then((data) => {
                    console.log(data);
                    //this.setState(data);
                    this.props.history.replace('/emailconfirm');
                })
                .catch((error) => {
                    this.setState({error: error.message})
                })
        } else if (!this.state.checked) {
            this.setState({error: 'You must accept the terms and conditions '})
        } else if (this.state.password !== this.state.password2) {
            this.setState({error: 'Passwords must be the same '})
        } else {
            this.setState({error: 'Introduzca todos los campos '})
        }
    }

    render() {
        let showErr = (
            this.state.error ?
                <View style={styles.error}>
                    <Text style={{color: 'red'}}>
                        {this.state.error}
                    </Text>
                </View> :
                <View></View>
        );
        

        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.cross}>
                    <Button
                        type="clear"
                        icon={
                            <Icon
                                name="times"
                                size={30}
                                color="grey"
                            />
                        }
                        onPress={() => {
                            this.props.history.push('/');
                        }
                        }
                    />
                </View>

                <View style={styles.login}>
                    <Image
                        style={styles.logo}
                        source={require('./../assets/images/murcy.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        value={this.state.username}
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Repeat password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    <CheckBox
                        center
                        title={<Text style={{color: 'blue', textDecorationLine: 'underline'}}
                        onPress={() => {
                            this.props.history.push('/termsConditions');
                        }}>I have read and I accept the Terms and Conditions </Text>}
                        checked={this.state.checked}
                        onPress={() => this.setState({ checked: !this.state.checked })}
                    />

                    {showErr}

                    <Button
                        buttonStyle={styles.button}
                        title="Sign Up"
                        onPress={() => {
                            this.handleSubmit()
                        }}/>


                    <Button
                        className='login-button'
                        type="clear"
                        buttonStyle={styles.button2}
                        title="Log In"
                        titleStyle={{color: 'grey'}}
                        onPress={() => {
                            this.props.history.replace('/login');
                        }
                        }/>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            //justifyContent: 'center',
        },
        cross: {
            marginTop: 50,
            marginBottom: 40,
            marginRight: 10,
            alignItems: 'flex-end',
        },
        login: {
            flex: 1,
            alignItems: 'center',
            //justifyContent: 'center',
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
            borderRadius: 14,
            marginBottom: 50,
        },
        error: {
            margin: 10,

        },

    })
