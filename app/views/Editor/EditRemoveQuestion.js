import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    FlatList,
    SafeAreaView
} from 'react-native'
import {Button, Text, CheckBox, ListItem} from 'react-native-elements';

import {editQuestion, deleteQuestion, infoQuestion} from "../../services/quiz/questionFuncs";



export default class EditRemoveQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params.info,
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
                    <Text h2>Question</Text>
                </View>
                <View style={styles.containerCreate}>
                    <TextInput
                        style={styles.input}
                        placeholder='Question'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        value={this.state.data.title}
                        onChangeText={val => this.onChangeText('data.title', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Description'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        value={this.state.data.description}
                        onChangeText={val => this.onChangeText('data.description', val)}
                    />
                    <Text>--------------------------</Text>
                    <Text>Fill in at least 2 answers</Text> 

                        <FlatList
                            data={this.state.data.options}
                            keyExtractor={item => item.title}
                            renderItem={({item}) => (
                                <ListItem
                                    title={item.title}
                                    bottomDivider
                                />
                            )}
                        />

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 1'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title1', val)}
                        />
                        <CheckBox value="1"
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct1}
                        onPress={() => this.setState({correct1: !this.state.correct1})} />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 2'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title2', val)}
                        />
                        <CheckBox value="2" 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct2}
                        onPress={() => this.setState({correct2: !this.state.correct2})} />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 3'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title3', val)}
                        />
                        <CheckBox value="3" 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct3}
                        onPress={() => this.setState({correct3: !this.state.correct3})} />
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Answer 4'
                            placeholderTextColor='darkgrey'
                            onChangeText={val => this.onChangeText('title4', val)}
                        />
                        <CheckBox value="4" 
                        title='Mark as correct'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct4}
                        onPress={() => this.setState({correct4: !this.state.correct4})} />
                    </View>
                    {showErr}
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
