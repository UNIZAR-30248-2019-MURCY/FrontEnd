import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView, ActivityIndicator, TouchableOpacity
} from 'react-native'
import {Button, colors, Text, ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {retrieveItem} from "../../../modules/AsyncStorage/retrieve";
import {listQuiz} from "../../../services/quiz/quizFuncs";

export default class QuestionsEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            error: '',
            data: []
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data)})
                listQuiz(this.state.token)
                    .then((data) => {
                        console.log(data);
                        this.setState({data: data});
                        this.setState({loading: false})
                    })
                    .catch((error) => {
                        this.setState({error: error.message})
                        this.setState({loading: false})
                    })
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({loading: true})
            retrieveItem('token')
                .then(data => {
                    this.setState({token: JSON.parse(data)})
                    listQuiz(this.state.token)
                        .then((data) => {
                            console.log(data);
                            this.setState({data: data});
                            this.setState({loading: false})
                        })
                        .catch((error) => {
                            this.setState({error: error.message})
                            this.setState({loading: false})
                        })
                })
    }

    render() {

        let showLoading = (
            this.state.loading ?
                <View style={[styles.containerLoading]} className='loadingShow'>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View></View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>

                    <TouchableOpacity
                        className='createQuiz'
                        onPress={() => this.props.navigation.navigate('CreateQuiz')}
                    >
                        <Text h2>Quizzes</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <SafeAreaView style={styles.containerQuestions}>
                        {showLoading}
                        <FlatList
                            className='list'
                            data={this.state.data}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => (
                                <ListItem
                                    className='item-button'
                                    title={
                                        <View style={styles.containerPublic}>
                                            <Text style={{fontSize: 18}}>{item.title}</Text>

                                            {item.isPublic ?
                                                <Icon
                                                    style={styles.iconPublic}
                                                    name="globe"
                                                    size={20}
                                                    color="grey"
                                                /> :
                                                item.lastWorkflow ?
                                                    <Text style={{fontSize: 12, color: 'grey', marginTop: 3.5}}>{'    '+ item.lastWorkflow.status}</Text> :
                                                    <View></View> }
                                        </View>
                                    }
                                    rightIcon={
                                        <Icon
                                            name="chevron-right"
                                            size={12}
                                            color="grey"
                                        />
                                    }
                                    bottomDivider

                                    onPress={() => {
                                        this.props.navigation.navigate('EditRemoveQuiz', {quiz: item});
                                    }}

                                />
                            )}
                        />

                    </SafeAreaView>
                </ScrollView>
                <ActionButton
                className='create-quiz-button'
                hideShadow={true}
                buttonColor="grey"
                onPress={() => {
                    this.props.navigation.navigate('CreateQuiz');
                }}
            />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        padding: 20
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerQuestions: {
        flex: 1,
        marginTop: 20,
    },
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    containerPublic: {
        flex: 1,
        flexDirection: 'row',
    },
    iconPublic: {
        marginLeft: 20,
    },

})

