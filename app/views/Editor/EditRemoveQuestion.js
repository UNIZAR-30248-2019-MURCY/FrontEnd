import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native'
import {Button, Text} from 'react-native-elements';

import { RadioButton } from 'react-native-paper';

import {editQuestion, deleteQuestion, infoQuestion} from "../../services/quiz/questionFuncs";



export default class EditRemoveQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.info,
            question: 'Cual es la capital de España?',
            answer1: '1',
            answer2: '2',
            answer3: '3',
            answer4: '4',
            value: '3',
            //data: [],
            error: false
        }
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount(){
        /*
        infoQuestion(this.state.id)
                .then((data) => {
                    console.log(data);
                    //this.setState(data);
                })
                .catch((error) => {
                    this.setState( {error: error.message})
                });
                */
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    editQuestion() {
        /*
        editQuestion(this.state.id, this.state.question, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.value)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                this.setState( {error: error.message})
            });
            */
            this.props.navigation.goBack();
    }

    deleteQuestion() {
        /*
        deleteQuestion(this.state.id)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                this.setState( {error: error.message})
            });
            */
            this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Question</Text>
                </View>
                <View style={styles.containerCreate}>
                    <TextInput
                        style={styles.input}
                        placeholder='Question'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        value={this.state.question}
                        onChangeText={val => this.onChangeText('question', val)}
                    />
                    <Text>----------------------------</Text>
                    <View>
                    <RadioButton.Group
                        onValueChange={value => this.setState({ value })}
                        value={this.state.value}
                    >
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 1'
                            placeholderTextColor='darkgrey'
                            value={this.state.answer1}
                            onChangeText={val => this.onChangeText('answer1', val)}
                        />
                        <RadioButton value="1" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 2'
                            placeholderTextColor='darkgrey'
                            value={this.state.answer2}
                            onChangeText={val => this.onChangeText('answer2', val)}
                        />
                        <RadioButton value="2" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 3'
                            placeholderTextColor='darkgrey'
                            value={this.state.answer3}
                            onChangeText={val => this.onChangeText('answer3', val)}
                        />
                        <RadioButton value="3" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 4'
                            placeholderTextColor='darkgrey'
                            value={this.state.answer4}
                            onChangeText={val => this.onChangeText('answer4', val)}
                        />
                        <RadioButton value="4" />
                        </View>
                    </RadioButton.Group>
                    </View>
                    <Button
                    buttonStyle={styles.button}
                    title="Edit"
                    onPress={() => {
                        this.editQuestion()
                    }}/>
                    <Button
                    buttonStyle={styles.button1}
                    title="Delete"
                    onPress={() => {
                        this.deleteQuestion()
                    }}/>
                    <Button
                        className='login-button'
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
        marginTop: 10,
        padding: 20
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
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button1: {
        width: 120,
        height: 45,
        marginTop: 15,
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    }
})
