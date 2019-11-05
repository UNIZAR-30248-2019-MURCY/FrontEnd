import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native'
import {Button, Text, CheckBox } from 'react-native-elements';


export default class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            options: [],

            title1: '',
            correct1: false,

            title2: '',
            correct2: false,

            title3: '',
            correct3: false,

            title4: '',
            correct4: false,

            error: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        if(this.state.title !== '' && this.state.title1 !== '' && this.state.title2 !== ''){
            this.state.options.push({title : this.state.title1, correct  : this.state.correct1})
            this.state.options.push({title : this.state.title2, correct  : this.state.correct2})

            if(this.state.title3 !== ''){
                this.state.options.push({title : this.state.title3, correct  : this.state.correct3})
            }
            if(this.state.title4 !== ''){
                this.state.options.push({title : this.state.title4, correct  : this.state.correct4})
            }
            /*
            createQuestion(this.state.title, this.state.description, this.state.options)
                .then((data) => {
                    console.log(data);
                    //this.setState(data);
                })
                .catch((error) => {
                    this.setState( {error: error.message})
                });
                */
               this.props.navigation.replace('Editor');
        }
        else{
            this.setState({error: 'Enter title and minimum 2 answers'})
        }

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

        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>New Question</Text>
                </View>
                <View style={styles.containerCreate}>
                    <TextInput
                        className='questionInput'
                        style={styles.input}
                        placeholder='Title'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('title', val)}
                    />
                    <TextInput
                        className='description'
                        style={styles.input}
                        placeholder='Description'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('description', val)}
                    />
                    <Text>--------------------------</Text>
                    <Text>Fill in at least 2 answers</Text> 
                    <View>
                        <TextInput
                            className='title1'
                            style={styles.input}
                            placeholder='Answer 1'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title1', val)}
                        />
                        <CheckBox value="1"
                        className='correct1' 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct1}
                        onPress={() => this.setState({correct1: !this.state.correct1})} />
                        </View>
                        <View>
                        <TextInput
                            className='title2'
                            style={styles.input}
                            placeholder='Answer 2'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title2', val)}
                        />
                        <CheckBox value="2" 
                        className='correct2' 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct2}
                        onPress={() => this.setState({correct2: !this.state.correct2})} />
                        </View>
                        <View>
                        <TextInput
                            className='title3'
                            style={styles.input}
                            placeholder='Answer 3'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title3', val)}
                        />
                        <CheckBox value="3"
                        className='correct3' 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct3}
                        onPress={() => this.setState({correct3: !this.state.correct3})} />
                        </View>
                        <View>
                        <TextInput
                            className='title4'
                            style={styles.input}
                            placeholder='Answer 4'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title4', val)}
                        />
                        <CheckBox value="4" 
                        className='correct4' 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct4}
                        onPress={() => this.setState({correct4: !this.state.correct4})} />
                    </View>
                    {showErr}
                    <Button
                    buttonStyle={styles.button}
                    className='create-button'
                    title="Create"
                    onPress={() => {
                        this.handleSubmit()
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
        marginTop: 10,
        padding: 20
    },
    checkBoxC: {
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
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    }
})
