import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Switch, Route } from './app/config/routing';
import LogIn from './app/views/LogIn';
import SignUp from './app/views/SignUp';


class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Switch>
            <Route exact path="/" render={props => <LogIn {...props} />} />
            <Route path="/signin" render={props => <SignUp {...props} />} />
          </Switch>
        </Router>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default App;