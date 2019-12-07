import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    FlatList,
    SafeAreaView, ActivityIndicator
} from 'react-native'
import {Button, Text, CheckBox, ListItem} from 'react-native-elements';

import {editQuestion, deleteQuestion, infoQuestion, createQuestion} from "../../services/quiz/questionFuncs";
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";


export default class EditRemoveQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            error: false,
            token: '',
            title: '',
            description: '',
            options: [],
        }
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data)})
            })

        if (this.props.navigation) {
            if (this.props.navigation.getParam('info')) {
                this.setState({id: this.props.navigation.getParam('info').id})
                this.setState({title: this.props.navigation.getParam('info').title})
                this.setState({description: this.props.navigation.getParam('info').description})
                this.setState({options: this.props.navigation.getParam('info').options})
            }
        }
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    editQuestion() {
        this.setState({loading: true})
        this.setState({error: false})

        if (this.state.title !== '') {
            editQuestion(this.state.id, this.state.title, this.state.description, this.state.options, this.state.token)
                .then((data) => {
                    console.log(data);
                    this.setState({loading: false})
                    this.props.navigation.replace('QuestionConfirm', {type: 'modified'});
                })
                .catch((error) => {
                    this.setState({error: error.message})
                    this.setState({loading: false})
                });
        } else {
            this.setState({loading: false})
            this.setState({error: 'Incomplete Fields'})
        }
    }

    deleteQuestion() {
        this.setState({loading: true})
        this.setState({error: false})

        deleteQuestion(this.state.id, this.state.token)
            .then((data) => {
                this.setState({loading: false})
                this.props.navigation.replace('QuestionConfirm', {type: 'deleted'});
            })
            .catch((error) => {
                this.setState({error: error.message})
                this.setState({loading: false})
            });
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
                <View style={[styles.containerLoading]} className='loadingShow'>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View></View>
        );

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.containerTitle}>
                        <Text h2>Question</Text>
                    </View>
                    <View style={styles.containerCreate}>
                        <Text style={styles.subTitle}>Question and description</Text>
                        <TextInput
                            className='questionInput'
                            style={styles.input}
                            placeholder='Question'
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            value={this.state.title}
                            onChangeText={val => this.onChangeText('title', val)}
                        />
                        <TextInput
                            className='description'
                            style={styles.input}
                            placeholder='Description'
                            autoCapitalize="none"
                            placeholderTextColor='darkgrey'
                            value={this.state.description}
                            onChangeText={val => this.onChangeText('description', val)}
                        />

                        <Text style={styles.subTitle2}>Answers</Text>
                        <Text style={styles.subTitle3}>Fill in at least 2 answers</Text>

                        <FlatList
                            data={this.state.options}
                            keyExtractor={item => item.title}
                            renderItem={({item, index}) => (
                                <View style={styles.containerButtons}>
                                    <TextInput
                                        style={styles.inputAns}
                                        value={item.title}
                                        placeholder='Answer'
                                        placeholderTextColor='darkgrey'
                                        onChangeText={(val) => {
                                            const copyOptions = [...this.state.options];
                                            copyOptions[index].title = val;
                                            this.setState({
                                                options: copyOptions,
                                            });
                                        }}
                                    />
                                    <CheckBox value="1"
                                              containerStyle={styles.checkBoxC}
                                              checked={item.correct}
                                              onPress={() => {
                                                  const copyOptions = [...this.state.options];
                                                  copyOptions[index].correct = !copyOptions[index].correct;
                                                  this.setState({
                                                      options: copyOptions,
                                                  });
                                              }}/>
                                </View>
                            )}
                        />

                        {showErr}
                        {showLoading}
                        <Button
                            className='edit-button'
                            buttonStyle={styles.button}
                            title="Edit"
                            onPress={() => {
                                this.editQuestion()
                            }}/>
                        <Button
                            className='delete-button'
                            buttonStyle={styles.button1}
                            title="Delete"
                            onPress={() => {
                                this.deleteQuestion()
                            }}/>
                        <Button
                            className='return-button'
                            type="clear"
                            buttonStyle={styles.button2}
                            title="Return"
                            titleStyle={{color: 'grey'}}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }
                            }/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 20
    },
    containerTitle: {
        marginTop: 50,
        padding: 20
    },
    containerCreate: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 20
    },
    subTitle: {
        flex: 1,
        fontSize: 22,
        color: 'grey',
    },
    subTitle2: {
        flex: 1,
        fontSize: 22,
        color: 'grey',
        marginTop: 30,
    },
    subTitle3: {
        flex: 1,
        fontSize: 17,
        color: 'grey',
        marginBottom: 5
    },
    checkBoxC: {
        padding: 0,
        marginTop: 25,
        alignItems: 'center',
        backgroundColor: "white",
        borderColor: "white"
    },
    logo: {
        margin: 30,
        marginBottom: 15,
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
    inputAns: {
        width: 260,
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
        marginTop: 50,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button1: {
        width: 120,
        height: 45,
        marginTop: 15,
        margin: 10,
        backgroundColor: '#ff5252',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    },
    containerLoading: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    containerButtons: {
        flexDirection: 'row'
    },
})
