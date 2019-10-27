import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logInUser, signUpUser} from "../services/user/userFuncs";

export default class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        logInUser(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
                //this.setState(data);
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }

    render() {
        return (
            <View style={styles.container}>
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
                            this.props.history.goBack();
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
                    placeholder='Email'
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

                <Button
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
                        this.props.history.replace('/signup');
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
        marginTop: 30,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    }

})
