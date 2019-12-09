import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView, ActivityIndicator
} from 'react-native'
import {Button, Text, CheckBox} from 'react-native-elements';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {createQuestion} from "../../services/quiz/questionFuncs";
import SwitchSelector from 'react-native-switch-selector';


export default class CreateQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
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

            ans3: false,
            ans4: false,
            length: 0,

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
            })
    }


    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        this.setState({loading: true})
        this.setState({error: false})
        if (this.state.title !== '' && this.state.title1 !== '' && this.state.title2 !== '') {
            this.state.options.push({title: this.state.title1, correct: this.state.correct1})
            this.state.options.push({title: this.state.title2, correct: this.state.correct2})

            if (this.state.title3 !== '') {
                this.state.options.push({title: this.state.title3, correct: this.state.correct3})
            }
            if (this.state.title4 !== '') {
                this.state.options.push({title: this.state.title4, correct: this.state.correct4})
            }
            console.log(this.state.title)
            console.log(this.state.description)
            console.log(this.state.options)


            createQuestion(this.state.title, this.state.description, this.state.options, this.state.publish ,this.state.token)
                .then((data) => {
                    console.log(data);
                    this.setState({loading: false})
                    this.props.navigation.replace('QuestionConfirm', {type: 'created'});
                })
                .catch((error) => {
                    this.setState({error: error.message})
                    this.setState({loading: false})
                });
        } else {
            this.setState({loading: false})
            this.setState({error: 'Enter title and minimum 2 answers'})
        }
    }

    addAnswer = (key) => {
        console.log(key)
        if (key == 0) {
            this.setState({ans3: true})
            this.setState({length: 1})
            this.setState({error: ''})
        } else if (key == 1) {
            this.setState({ans4: true})
            this.setState({length: 2})
        } else {
            this.setState({error: 'Maximum is 4 answers'})
        }
    }

    deleteAnswer = (key) => {
        if (key == 2) {
            this.setState({ans4: false})
            this.setState({length: 1})
            this.setState({title4: ''})
            this.setState({error: ''})
        } else if (key == 1) {
            this.setState({ans3: false})
            this.setState({length: 0})
            this.setState({title3: ''})
        } else {
            this.setState({error: 'Minimum is 2 answers'})
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

        let answer3 = (
            this.state.ans3 ?
                <View style={styles.containerButtons}>
                    <TextInput
                        className='title3'
                        style={styles.inputAns}
                        placeholder='Answer 3'
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('title3', val)}
                    />
                    <CheckBox
                        className='correct3'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct3}
                        onPress={() => this.setState({correct3: !this.state.correct3})}/>
                </View> : <View></View>);

        let answer4 = (
            this.state.ans4 ?
                <View style={styles.containerButtons}>
                    <TextInput
                        className='title4'
                        style={styles.inputAns}
                        placeholder='Answer 4'
                        placeholderTextColor='darkgrey'
                        onChangeText={val => this.onChangeText('title4', val)}
                    />
                    <CheckBox
                        className='correct4'
                        containerStyle={styles.checkBoxC}
                        checked={this.state.correct4}
                        onPress={() => this.setState({correct4: !this.state.correct4})}/>
                </View> : <View></View>);


        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.containerTitle}>
                        <Text h2>New Question</Text>
                    </View>
                    <View style={styles.containerCreate}>
                        <Text style={styles.subTitle}>Question and description</Text>
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
                        <Text style={styles.subTitle3}>Fill in at least 2 answers</Text>

                        <View style={styles.containerButtons}>
                            <TextInput
                                className='title1'
                                style={styles.inputAns}
                                placeholder='Answer 1'
                                placeholderTextColor='darkgrey'
                                onChangeText={val => this.onChangeText('title1', val)}
                            />

                            <CheckBox value="1"
                                      className='correct1'
                                      containerStyle={styles.checkBoxC}
                                      checked={this.state.correct1}
                                      onPress={() => this.setState({correct1: !this.state.correct1})}/>
                        </View>
                        <View style={styles.containerButtons}>
                            <TextInput
                                className='title2'
                                style={styles.inputAns}
                                placeholder='Answer 2'
                                placeholderTextColor='darkgrey'
                                onChangeText={val => this.onChangeText('title2', val)}
                            />
                            <CheckBox value="2"
                                      className='correct2'
                                      containerStyle={styles.checkBoxC}
                                      checked={this.state.correct2}
                                      onPress={() => this.setState({correct2: !this.state.correct2})}/>
                        </View>
                        {answer3}
                        {answer4}
                        <View style={styles.containerButton}>
                            <View style={styles.buttonContainer}>
                                <Button title="Add ans"
                                        buttonStyle={styles.buttonAdd}
                                        className='add-button'
                                        onPress={() => {
                                            this.addAnswer(this.state.length)
                                        }}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Delete ans"
                                        buttonStyle={styles.buttonRemove}
                                        className='remove-button'
                                        onPress={() => {
                                            this.deleteAnswer(this.state.length)
                                        }}/>
                            </View>
                        </View>



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
        marginTop: 65,
        marginBottom: 15,
        width: 250,
    },
})
