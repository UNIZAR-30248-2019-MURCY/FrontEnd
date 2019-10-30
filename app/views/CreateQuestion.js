import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native'
import {Button, CheckBox, Text} from 'react-native-elements';

export default class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            checked: false,
            checkbox2: false,
            checkbox3: false,
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
            logInUser(this.state.email, this.state.password)
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
                    <View>
                        <CheckBox 
                            style={styles.input}
                            center
                            title={<TextInput 
                                placeholder='Answer 1'
                                autoCapitalize="none"
                                placeholderTextColor='darkgrey'
                                onChangeText={val => this.onChangeText('answer', val)}/>}
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        />
                    </View>
                    <Button
                    buttonStyle={styles.button}
                    title="Create"
                    onPress={() => {
                        this.handleSubmit()
                    }}/>
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
    }
})
