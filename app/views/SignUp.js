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

          <Link to="/">
            <Text>Log In</Text>
          </Link>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'whitesmoke',
    margin: 10,
    padding: 8,
    color: 'grey',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 100,
    padding: 20
  },
  logo: {
    margin: 30,
    padding: 8,
    width: 100,
    height: 100
  },
  signUpScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  button: {
    width: 150,
    height: 55,
    margin: 40,
    padding: 8,
    backgroundColor: 'grey',
    borderRadius: 14
  }

})
