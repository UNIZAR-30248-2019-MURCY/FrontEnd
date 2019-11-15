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
import {retrieveItem} from "../../services/AsyncStorage/retrieve";
import {editQuestion, deleteQuestion, infoQuestion} from "../../services/quiz/questionFuncs";


export default class EditRemoveQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            data: this.props.navigation.state.params.info,
            title: this.props.navigation.state.params.info.title,
            description: this.props.navigation.state.params.info.description,
            options: [],

            title1: this.props.navigation.state.params.info.options[0].title,
            correct1: this.props.navigation.state.params.info.options[0].correct,

            title2: this.props.navigation.state.params.info.options[1].title,
            correct2: this.props.navigation.state.params.info.options[1].correct,

            title3: '',
            correct3: false,

            title4: '',
            correct4: false,

            error: false
        }
        
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        if(this.props.navigation.state.params.info.options.length==4){
            this.setState({title3: this.props.navigation.state.params.info.options[2].title})
            this.setState({correct3: this.props.navigation.state.params.info.options[2].correct})
            this.setState({title4: this.props.navigation.state.params.info.options[3].title})
            this.setState({correct4: this.props.navigation.state.params.info.options[3].correct})
        }else if(this.props.navigation.state.params.info.options.length==3){
            this.setState({title3: this.props.navigation.state.params.info.options[2].title})
            this.setState({correct3: this.props.navigation.state.params.info.options[2].correct})
        }
        retrieveItem('token')
            .then(data => {
                this.setState({token: data})
            })
    }


    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    editQuestion() {
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
            editQuestion(this.state.title, this.state.description, this.state.options, this.state.token)
                .then((data) => {
                    console.log(data);
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
                <View style={styles.error}>
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
                        className='questionInput'
                        placeholder='Question'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        value={this.state.title}
                        onChangeText={val => this.onChangeText('title', val)}
                    />
                    <TextInput
                        style={styles.input}
                        className='Description'
                        placeholder='Description'
                        autoCapitalize="none"
                        placeholderTextColor='darkgrey'
                        value={this.state.description}
                        onChangeText={val => this.onChangeText('description', val)}
                    />
                    <Text>--------------------------</Text>
                    <Text>Fill in at least 2 answers</Text> 
                    <View>
                        <TextInput
                            style={styles.input}
                            className='title1'
                            placeholder='Answer 1'
                            placeholderTextColor='darkgrey'
                            value={this.state.title1}
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
                            style={styles.input}
                            className='title2'
                            placeholder='Answer 2'
                            placeholderTextColor='darkgrey'
                            value={this.state.title2}
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
                            style={styles.input}
                            className='title3'
                            placeholder='Answer 3'
                            placeholderTextColor='darkgrey'
                            value={this.state.title3}
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
                            style={styles.input}
                            className='title4'
                            placeholder='Answer 4'
                            placeholderTextColor='darkgrey'
                            value={this.state.title4}
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
                    className='edit-button'
                    title="Edit"
                    onPress={() => {
                        this.editQuestion()
                    }}/>
                    <Button
                    buttonStyle={styles.button1}
                    className='delete-button'
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
        //justifyContent: 'center',
        padding: 20
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
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
    },
    checkBoxC: {
        backgroundColor: "white",
        borderColor: "white"
    },
    containerCreate: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
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
        backgroundColor: 'red',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    }
})
