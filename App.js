import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
import Request from "./app/views/Player/Request";
import RequestConfirm from "./app/views/Player/RequestConfirm";
import RequestList from "./app/views/Reviewer/RequestList";
import RequestDetails from "./app/views/Reviewer/RequestDetails";


import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

/*
  Player
 */
const QuizzesPlayerStack = createStackNavigator(
    {
        QuizzesScreen: QuizzesScreen,
    },
    {
        initialRouteName: 'QuizzesScreen',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const SettingsPlayerStack = createStackNavigator(
    {
        SettingsPlayer: SettingsPlayer,
        Request: Request,
        RequestConfirm: RequestConfirm,
    },
    {
        initialRouteName: 'SettingsPlayer',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const playerNavigator = createMaterialBottomTabNavigator(
    {
        Quizzes: {
            screen: QuizzesPlayerStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="gamepad" size={22} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsPlayerStack,
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


/*
  Editor
 */

const QuestionsEditStack = createStackNavigator(
    {
        QuestionsEdit: QuestionsEdit,
    },
    {
        initialRouteName: 'QuestionsEdit',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const QuizzesEditStack = createStackNavigator(
    {
        QuizzesEdit: QuizzesEdit,
    },
    {
        initialRouteName: 'QuizzesEdit',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const SettingsEditorStack = createStackNavigator(
    {
        SettingsEditor: SettingsEditor,
    },
    {
        initialRouteName: 'SettingsEditor',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const editorNavigator = createMaterialBottomTabNavigator(
    {
        Questions: {
            screen: QuestionsEditStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="question-circle" size={22} color={tintColor} />
                )
            }
        },
        Quizzes: {
            screen: QuizzesEditStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="gamepad" size={22} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsEditorStack,
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

const RequestListStack = createStackNavigator(
    {
        RequestList: RequestList,
        RequestDetails: RequestDetails,
    },
    {
        initialRouteName: 'RequestList',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);


const reviewerNavigator = createMaterialBottomTabNavigator(
    {
        Requests: {
            screen: RequestListStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="edit" size={22} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsEditorStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cogs" size={22} color={tintColor} />
                )
            }
        }
    },
    {
        initialRouteName: 'Requests',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: { backgroundColor: 'black' },
    }
);

/*
  Root
 */

const RootStack = createStackNavigator(
    {
        Welcome: Welcome,
        LogIn: LogIn,
        SignUp: SignUp,
        EmailConfirm: EmailConfirm,
        TermsConditions: TermsConditions,
        Player: playerNavigator,
        Editor: editorNavigator,
        Reviewer: reviewerNavigator,
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
