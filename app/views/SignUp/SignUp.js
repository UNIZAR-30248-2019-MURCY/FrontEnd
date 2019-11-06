import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Text,
    ScrollView, ActivityIndicator
} from 'react-native'
import {Button, CheckBox} from 'react-native-elements';
import {signUpUser} from '../../services/user/userFuncs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            email: '',
            fullName: '',
            checked: false,
            error: false,
            loading: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        if (this.state.username !== '' && this.state.password !== '' && this.state.email !== '' && this.state.fullName !== '') {
            if (this.state.checked) {
                if (this.state.password === this.state.password2) {
                    this.setState({loading: true})
                    this.setState({error: false})
                    signUpUser(this.state.username, this.state.password, this.state.email, this.state.fullName)
                        .then((data) => {
                            this.setState({loading: false}),
                                this.props.navigation.replace('EmailConfirm');
                        })
                        .catch((error) => {
                            this.setState({error: error.message}),
                                this.setState({loading: false})
                        })
                } else {
                    this.setState({error: 'Passwords must be the same '})
                }
            } else {
                this.setState({error: 'You must accept the terms and conditions '})
            }
        } else {
            this.setState({error: 'Introduzca todos los campos '})
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
                <View style={[styles.containerLoading, styles.horizontal]}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View></View>
        );

        return (
            <View style={styles.container}>
                <ScrollView>
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
                            value={this.state.username}
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('username', val)}
                        />
                        <TextInput
                            className='emailInput'
                            style={styles.input}
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('email', val)}
                        />
                        <TextInput
                            className='passInput'
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('password', val)}
                        />
                        <TextInput
                            className='passrepInput'
                            style={styles.input}
                            placeholder='Repeat password'
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('password2', val)}
                        />
                        <TextInput
                            className='nameInput'
                            style={styles.input}
                            placeholder='Full Name'
                            value={this.state.fullName}
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('fullName', val)}
                        />
                        <CheckBox
                            center
                            containerStyle={styles.checkBox}
                            title={<Text style={{color: 'black'}}
                                         onPress={() => {
                                             this.props.navigation.navigate('TermsConditions');
                                         }}>I have read and I accept the Terms and Conditions </Text>}
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked})}
                        />

                        {showErr}
                        {showLoading}
                        <Button
                            className='signup-button'
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
                                this.props.navigation.replace('LogIn');
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
        containerLoading: {
            flex: 1,
            justifyContent: 'center'
        },
        horizontal: {
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
        checkBox: {
            width: 300,
            marginTop: 20,
            borderRadius: 14,
        },

    })
