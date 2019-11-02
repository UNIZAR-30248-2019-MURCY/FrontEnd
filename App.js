import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router, Switch, Route } from './app/config/routing';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from './app/views/Welcome';
import LogIn from './app/views/LogIn/LogIn';
import SignUp from './app/views/SignUp/SignUp';
import EmailConfirm from './app/views/SignUp/EmailConfirm';
import TermsConditions from './app/views/SignUp/Terms&Cond';
import CreateQuestion from './app/views/Editor/CreateQuestion';
import QuizzesScreen from "./app/views/Player/QuizzesScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import SettingsPlayer from "./app/views/Player/SettingsPlayer";
import QuestionsEdit from "./app/views/Editor/QuestionsEdit";
import QuizzesEdit from "./app/views/Editor/QuizzesEdit";
import SettingsEditor from "./app/views/Editor/SettingsEditor";

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const playerNavigator = createMaterialBottomTabNavigator(
    {
        Quizzes: {
            screen: QuizzesScreen,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="gamepad" size={22} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsPlayer,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cogs" size={22} color={tintColor} />
                )
            }
        }
    },
    {
        initialRouteName: 'Quizzes',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'black' },
    }
);

const editorNavigator = createMaterialBottomTabNavigator(
    {
        Questions: {
            screen: QuestionsEdit,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="question-circle" size={22} color={tintColor} />
                )
            }
        },
        Quizzes: {
            screen: QuizzesEdit,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="gamepad" size={22} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsEditor,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cogs" size={22} color={tintColor} />
                )
            }
        }
    },
    {
        initialRouteName: 'Questions',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'black' },
    }
);
const RootStack = createStackNavigator(
    {
        Welcome: Welcome,
        LogIn: LogIn,
        SignUp: SignUp,
        EmailConfirm: EmailConfirm,
        TermsConditions: TermsConditions,
        Player: playerNavigator,
        Editor: editorNavigator,
        CreateQuestion: CreateQuestion,
    },
    {
      initialRouteName: 'Welcome',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
);

const AppContainer = createAppContainer(RootStack);


class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
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
