import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {createAppContainer, NavigationActions, StackActions, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator,} from 'react-navigation-stack';
import Welcome from './app/views/Welcome';
import LogIn from './app/views/LogIn/LogIn';
import SignUp from './app/views/SignUp/SignUp';
import EmailConfirm from './app/views/SignUp/EmailConfirm';
import EmailVerif from './app/views/SignUp/EmailVerif';
import TermsConditions from './app/views/SignUp/TermsCond';
import CreateQuestion from './app/views/Editor/question/CreateQuestion';
import QuizzesScreen from "./app/views/Player/QuizzesScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import SettingsPlayer from "./app/views/Player/SettingsPlayer";
import QuestionsEdit from "./app/views/Editor/question/QuestionsEdit";
import QuizzesEdit from "./app/views/Editor/quiz/QuizzesEdit";
import SettingsEditor from "./app/views/Editor/SettingsEditor";
import Request from "./app/views/Player/Request";
import RequestConfirm from "./app/views/Player/RequestConfirm";
import RequestList from "./app/views/Reviewer/RequestList";
import RequestDetails from "./app/views/Reviewer/RequestDetails";
import RequestActionConfirm from "./app/views/Reviewer/RequestActionConfirm";
import SettingsReviewer from "./app/views/Reviewer/SettingsReviewer";
import EditRemoveQuestion from "./app/views/Editor/question/EditRemoveQuestion";
import QuestionConfirm from "./app/views/Editor/question/QuestionConfirm";
import WorkflowView from "./app/components/WorkflowView";
import WorkflowQuestionView from "./app/components/WorkflowQuestionView";
import CreateQuiz from "./app/views/Editor/quiz/CreateQuiz";
import CreateQuiz2 from "./app/views/Editor/quiz/CreateQuiz2";
import QuizConfirm from "./app/views/Editor/quiz/QuizConfirm";
import EditRemoveQuiz from "./app/views/Editor/quiz/EditRemoveQuiz";
import EditRemoveQuiz2 from "./app/views/Editor/quiz/EditRemoveQuiz2";
import QuizPlayScreen from "./app/views/Player/QuizPlayScreen";
import SliderEntry from "./app/components/SliderEntry";
import SliderEntryQuestion from "./app/components/SliderEntryQuestion";
import Points from "./app/views/Player/Points";
import QuestionReqList from "./app/views/Reviewer/QuestionReqList"

import {Linking} from "expo";

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {retrieveItem} from "./app/modules/AsyncStorage/retrieve";
import {getRequestEdit} from "./app/services/user/userFuncs";
import WEB from './app/config/web';


/*
  Player
 */


const QuizzesPlayerStack = createStackNavigator(
    {
        QuizzesScreen: QuizzesScreen,
        QuizPlayScreen: QuizPlayScreen,
        SliderEntry: SliderEntry,
        SliderEntryQuestion: SliderEntryQuestion,
        Points: Points
    },
    {
        initialRouteName: 'QuizzesScreen',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

// This does the trick
QuizzesPlayerStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            if (route.routeName === "QuizPlayScreen" || route.routeName === "Points") {
                tabBarVisible = false;
            } else {
                tabBarVisible = true;
            }
        });
    }

    return {
        tabBarVisible
    };
};

const SettingsPlayerStack = createStackNavigator(
    {
        SettingsPlayer: SettingsPlayer,
        Request: Request,
        WorkflowView: WorkflowView,
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
                tabBarIcon: ({tintColor}) => (
                    <Icon name="gamepad" size={22} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: SettingsPlayerStack,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="cogs" size={22} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Quizzes',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: {backgroundColor: 'black'},
    }
);


/*
  Editor
 */

const QuestionsEditStack = createStackNavigator(
    {
        QuestionsEdit: QuestionsEdit,
        CreateQuestion: CreateQuestion,
        EditRemoveQuestion: EditRemoveQuestion,
        QuestionConfirm: QuestionConfirm,
        WorkflowQuestionView: WorkflowQuestionView,
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
        CreateQuiz: CreateQuiz,
        CreateQuiz2: CreateQuiz2,
        QuizConfirm: QuizConfirm,
        EditRemoveQuiz: EditRemoveQuiz,
        EditRemoveQuiz2: EditRemoveQuiz2,
        WorkflowQuestionView: WorkflowQuestionView,
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
                tabBarIcon: ({tintColor}) => (
                    <Icon name="question-circle" size={22} color={tintColor}/>
                )
            }
        },
        Quizzes: {
            screen: QuizzesEditStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({tintColor}) => (
                    <Icon name="gamepad" size={22} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: SettingsEditorStack,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="cogs" size={22} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Questions',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: {backgroundColor: 'black'},
    }
);

/*
  Reviewer
 */
const RequestListStack = createStackNavigator(
    {
        RequestList: RequestList,
        RequestDetails: RequestDetails,
        WorkflowView: WorkflowView,
        RequestActionConfirm: RequestActionConfirm,
    },
    {
        initialRouteName: 'RequestList',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const QuestionRequestListStack = createStackNavigator(
    {
        QuestionReqList: QuestionReqList,
        RequestDetails: RequestDetails,
        WorkflowView: WorkflowView,
        RequestActionConfirm: RequestActionConfirm,
    },
    {
        initialRouteName: 'QuestionReqList',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const SettingsReviewerStack = createStackNavigator(
    {
        SettingsReviewer: SettingsReviewer,
    },
    {
        initialRouteName: 'SettingsReviewer',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const reviewerNavigator = createMaterialBottomTabNavigator(
    {
        Editors: {
            screen: RequestListStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({tintColor}) => (
                    <Icon name="edit" size={22} color={tintColor}/>
                )
            }
        },
        Questions: {
            screen: QuestionRequestListStack,
            navigationOptions: {
                showLabel: false,
                tabBarIcon: ({tintColor}) => (
                    <Icon name="question" size={22} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: SettingsReviewerStack,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="cogs" size={22} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Editors',
        activeColor: '#f0edf6',
        inactiveColor: 'gray',
        barStyle: {backgroundColor: 'black'},
    }
);


/*
  Global
 */
const AppStack = createStackNavigator(
    {
        Player: playerNavigator,
        Editor: editorNavigator,
        Reviewer: reviewerNavigator,
    },
    {
        initialRouteName: 'Player',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);


const AuthStack = createStackNavigator(
    {
        LogIn: LogIn,
        SignUp: SignUp,
        EmailConfirm: EmailConfirm,
        TermsConditions: TermsConditions,
    },
    {
        initialRouteName: 'LogIn',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);


const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: {
                screen: Welcome,
                path: WEB.URL + ':token'
            },
            App: AppStack,
            Auth: AuthStack,
            EmailVerif: {
                screen: EmailVerif,
                path: WEB.URL
            },
        },
        {
            initialRouteName: 'AuthLoading',
            headerMode: 'none',
            navigationOptions: {
                headerVisible: false,
            }
        }
    )
);

const uriPrefix = Linking.makeUrl("/");

class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppContainer uriPrefix={uriPrefix}/>
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
