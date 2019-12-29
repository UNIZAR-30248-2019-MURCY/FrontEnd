import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView, ActivityIndicator, FlatList, TouchableOpacity
} from 'react-native'
import {Button, Text, CheckBox} from 'react-native-elements';
import {retrieveItem} from "../../../modules/AsyncStorage/retrieve";
import {createQuiz} from "../../../services/quiz/quizFuncs";
import SwitchSelector from 'react-native-switch-selector';
import {listQuestions} from "../../../services/question/questionFuncs";
import Icon from 'react-native-vector-icons/FontAwesome';




export default class CreateQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            title: '',
            description: '',
            loading: false,
            publish: false,
            dataSource: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.navigation) {
            if(this.props.navigation.getParam('data')){
                this.setState({title: this.props.navigation.getParam('title')})
                this.setState({description: this.props.navigation.getParam('description')})
                this.setState({dataSource: this.props.navigation.getParam('data')})
                this.setState({token: this.props.navigation.getParam('token')})
            }
        }
    }

    handleSubmit() {

        this.setState({loading: true})
        this.setState({error: false})
        console.log(this.state.title)
        console.log(this.state.description)
        console.log(this.state.dataSource)
        var questionIds= []
        this.state.dataSource.map(function(element, indice){
            questionIds.push(element.id)
        })
        console.log(questionIds)

        createQuiz(this.state.title, this.state.description, questionIds, this.state.publish ,this.state.token)
            .then((data) => {
                console.log(data);
                this.setState({loading: false})
                this.props.navigation.replace('QuizConfirm', {type: 'created'});
            })
            .catch((error) => {
                this.setState({error: error.message})
                this.setState({loading: false})
            });
    }

    FlatListItemSeparator = () => <View style={styles.line} />;


    renderItem = data =>
        <Text style={[styles.list, styles.lightText]}>  {data.item.title} </Text>


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
                        <Text h2>New Quiz</Text>
                    </View>
                    <View style={styles.containerCreate}>
                        <Text style={styles.subTitle}>Title and description</Text>
                        <View style={styles.container3}>

                            <Text style={[styles.list, styles.lightText]}>{this.state.title}</Text>
                            <Text style={[styles.list, styles.lightText]}>{this.state.description}</Text>
                        </View>

                        <Text style={styles.subTitle2}>Questions</Text>

                        <ScrollView>
                        <View style={styles.container2}>
                            <FlatList
                                data={this.state.dataSource}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={item => this.renderItem(item)}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
                            />
                        </View>
                        </ScrollView>


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
                            className='create-quiz-button'
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
    subTitle4: {
        flex: 1,
        fontSize: 17,
        color: 'grey',
        justifyContent: "flex-start",
        alignItems: "flex-start",
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

    container2: {
        flex: 1,
        //backgroundColor: "#192338",
        marginTop: 20,
        marginBottom: 5,
        position: "relative",
        width: 300,
        maxHeight: 200,
    },
    container3: {
        flex: 1,
        //backgroundColor: "#192338",
        marginTop: 10,
        position: "relative",
        width: 300,
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        //backgroundColor: "#192338",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        zIndex: -1,
        borderRadius: 14
    },
    lightText: {
        color: 'grey',
        width: 200,
        paddingLeft: 15,
        fontSize: 17
    },
    line: {
        height: 0.1,
        width: "50%",
        backgroundColor:"white"
    },
})
