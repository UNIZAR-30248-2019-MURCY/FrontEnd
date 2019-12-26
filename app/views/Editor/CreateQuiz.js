import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView, ActivityIndicator
} from 'react-native'
import {Button, Text, CheckBox} from 'react-native-elements';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {createQuiz} from "../../services/quiz/quizFuncs";
import SwitchSelector from 'react-native-switch-selector';
import {listQuestions} from "../../services/question/questionFuncs";




export default class CreateQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            title: '',
            description: '',
            options: [],

            questions: [],

            loading: false,
            publish: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        retrieveItem('token')
        .then(data => {
            this.setState({token: JSON.parse(data)})
            listQuestions(this.state.token)
                .then((data) => {
                    console.log(data);
                    this.setState({questions: data});
                })
                .catch((error) => {
                    this.setState({error: error.message})
                })
        })
        
    }


    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        this.setState({loading: true})
        this.setState({error: false})
        if (this.state.title !== '') {
            console.log(this.state.title)
            console.log(this.state.description)
            console.log(this.state.options)
            createQuiz(this.state.title, this.state.description, this.state.questions, this.state.publish ,this.state.token)
                .then((data) => {
                    console.log(data);
                    this.setState({loading: false})
                    this.props.navigation.replace('QuizConfirm', {type: 'created'});
                })
                .catch((error) => {
                    this.setState({error: error.message})
                    this.setState({loading: false})
                });
        } else {
            this.setState({loading: false})
            this.setState({error: 'Enter title and minimum 2 questions'})
        }
    }

    render() {
        const options = [
            { label: '01:00', value: '1' },
            { label: '01:30', value: '1.5' },
            { label: '02:00', value: '2' }
        ];

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
                        <Text h2>New Quiz</Text>
                    </View>
                    <View style={styles.containerCreate}>
                        <Text style={styles.subTitle}>Title and description</Text>
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
                        <Text style={styles.subTitle2}>Answers</Text>

                        <View style={styles.containerSelector}>
                            <SwitchSelector
                                initial={0}
                                onPress={value => this.setState({ publish: value })}
                                textColor='grey'
                                selectedColor='white'
                                buttonColor='grey'
                                borderColor='grey'
                                hasPadding
                                options={[
                                    { label: "Draft", value: "false", },
                                    { label: "Public", value: "true",  }
                                ]}
                            />
                        </View>

                        {showErr}
                        {showLoading}

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
        width: 200,
        height: 50,
        marginTop: 30,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    },
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAdd: {
        width: 140,
        height: 45,
        marginTop: 25,
        margin: 10,
        backgroundColor: '#4b7bec',
        borderRadius: 14
    },
    buttonRemove: {
        width: 140,
        height: 45,
        marginTop: 25,
        margin: 10,
        backgroundColor: '#ff5252',
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
    error: {
        marginTop: 40,
        alignItems: 'center',
    },
    containerSelector: {
        flex: 1,
        marginTop: 40,
        marginBottom: 15,
        width: 250,
    },
})
