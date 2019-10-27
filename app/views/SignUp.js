import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import { Button } from 'react-native-elements';
import { Link } from './../config/routing';
import { signUpUser } from '../services/user/userFuncs';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      error: false
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  handleSubmit() {
    signUpUser(this.state.username, this.state.password, this.state.email, this.state.phone_number)
        .then((data) => {
            console.log(data);
            //this.setState(data);
        })
        .catch((error)=>{
            alert(error.message);
         });
  }


  render() {
    let showErr = (
        this.state.error ?
            <Text>
              {this.state.error}
            </Text> :
            <View></View>
    );

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
              placeholder='Username'
              autoCapitalize="none"
              placeholderTextColor='darkgrey'
              onChangeText={val => this.onChangeText('username', val)}
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
              placeholder='Email'
              autoCapitalize="none"
              placeholderTextColor='darkgrey'
              onChangeText={val => this.onChangeText('email', val)}
          />
          <TextInput
              style={styles.input}
              placeholder='Phone Number'
              autoCapitalize="none"
              placeholderTextColor='darkgrey'
              onChangeText={val => this.onChangeText('phone_number', val)}
          />

          <Button
              buttonStyle={styles.button}
              title="Sign Up"
              onPress={() => {this.handleSubmit()}} />

          {showErr}

            <Button
                className='login-button'
                type="clear"
                buttonStyle={styles.button2}
                title="Log In"
                titleStyle={{color: 'grey'}}
                onPress={() => {
                    this.props.history.replace('/login');}
                } />
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
      marginTop:30,
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
