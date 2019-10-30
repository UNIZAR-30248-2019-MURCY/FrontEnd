import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Switch, Route } from './app/config/routing';
import Welcome from './app/views/Welcome';
import LogIn from './app/views/LogIn';
import SignUp from './app/views/SignUp';
import EmailConfirm from './app/views/EmailConfirm';
import TermsConditions from './app/views/Terms&Cond';
import Player from './app/views/Player';
import Editor from './app/views/Editor';
import CreateQuestion from './app/views/CreateQuestion';


class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Welcome {...props} />} />
            <Route exact path="/login" render={props => <LogIn {...props} />} />
            <Route exact path="/termsConditions" render={props => <TermsConditions {...props} />} />
            <Route path="/signup" render={props => <SignUp {...props} />} />
            <Route path="/emailconfirm" render={props => <EmailConfirm {...props} />} />
            <Route path="/player" render={props => <Player {...props} />} />
            <Route path="/editor" render={props => <Editor {...props} />} />
            <Route path="/createQuestion" render={props => <CreateQuestion {...props} />} />
          </Switch>
        </Router>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default App;
