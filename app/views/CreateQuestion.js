import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native'
import {Button, Text} from 'react-native-elements';

import { RadioButton } from 'react-native-paper';


export default class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            value: '1',
            error: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        if(this.state.question !== '' && this.state.answer !== ''){
            /*
            createQuestion(this.state.question, this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4, this.state.value)
                .then((data) => {
                    console.log(data);
                    //this.setState(data);
                })
                .catch((error) => {
                    this.setState( {error: error.message})
                });
                */
               this.props.history.push('/editor');
        }
        else{
            this.setState({error: 'Introduzca todos los campos'})
        }

    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerMurcy}>
                    <Text h3>Create a new Question</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Question'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
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
                            onChangeText={val => this.onChangeText('answer1', val)}
                        />
                        <RadioButton value="1" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 2'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('answer2', val)}
                        />
                        <RadioButton value="2" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 3'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('answer3', val)}
                        />
                        <RadioButton value="3" />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 4'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('answer4', val)}
                        />
                        <RadioButton value="4" />
                        </View>
                    </RadioButton.Group>
                    </View>
                    <Button
                    buttonStyle={styles.button}
                    title="Create"
                    onPress={() => {
                        this.handleSubmit()
                    }}/>
                    <Button
                        className='login-button'
                        type="clear"
                        buttonStyle={styles.button2}
                        title="Return"
                        titleStyle={{color: 'grey'}}
                        onPress={() => {
                            this.props.history.replace('/editor');
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
    containerMurcy: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 160,
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
        marginTop: 70,
        width: 150,
        height: 55,
        padding: 8,
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    }
})
