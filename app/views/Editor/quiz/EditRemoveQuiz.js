import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView, ActivityIndicator, FlatList, TouchableOpacity
} from 'react-native'
import {Button, Text, CheckBox} from 'react-native-elements';
import {retrieveItem} from "../../../modules/AsyncStorage/retrieve";
import {createQuiz, deleteQuiz} from "../../../services/quiz/quizFuncs";
import SwitchSelector from 'react-native-switch-selector';
import {listQuestions} from "../../../services/question/questionFuncs";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditRemoveQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            title: '',
            description: '',
            data: [],
            dataSource: [],
            loading: false,
            publish: false,

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
                        if (this.props.navigation) {
                            if (this.props.navigation.getParam('quiz')) {
                                this.setState({data: this.props.navigation.getParam('quiz')})
                                this.setState({id: this.props.navigation.getParam('quiz').id})
                                this.setState({title: this.props.navigation.getParam('quiz').title})
                                this.setState({description: this.props.navigation.getParam('quiz').description})
                            }
                        }
                        this.rellenar(data, this.props.navigation.getParam('quiz').questions)
                    })
                    .catch((error) => {
                        this.setState({error: error.message})
                    })
            })
    }

    rellenar(data, questions){
        var options=[];
        data.map(function(element, indice){
            const selected = questions.find(
                item => item.id === element.id
            );
            options.push({id: element.id, title: element.title, isSelect: selected != null})
        })
        this.setState({dataSource: options});
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    handleSubmit() {
        this.setState({loading: true})
        this.setState({error: false})
        const selected = this.state.dataSource.filter(
            item => item.isSelect === true
        );
        console.log(selected)
        if (this.state.title !== '' && selected.length > 1) {
            this.setState({loading: false})
            this.props.navigation.navigate('EditRemoveQuiz2',{id: this.state.id, title: this.state.title, description:this.state.description, selected: selected, data: this.state.data});
        } else {
            this.setState({loading: false})
            this.setState({error: 'Enter title and minimum 2 questions'})
        }
    }

    deleteQuiz() {
        this.setState({loading: true})
        this.setState({error: false})

        deleteQuiz(this.state.id, this.state.token)
            .then((data) => {
                this.setState({loading: false})
                this.props.navigation.replace('QuizConfirm', {type: 'deleted'});
            })
            .catch((error) => {
                this.setState({error: error.message})
                this.setState({loading: false})
            });
    }

    FlatListItemSeparator = () => <View style={styles.line} />;

    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;

        const index = this.state.dataSource.findIndex(
            item => data.item.id === item.id
        );

        this.state.dataSource[index] = data.item;

        this.setState({
            dataSource: this.state.dataSource,
        });
    };

    renderItem = data =>
        <TouchableOpacity
            className='question'
            style={[styles.list]}
            onPress={() => this.selectItem(data)}
        >
            <Text style={styles.lightText}>  {data.item.title}    {data.item.isSelect ?
                <Icon
                    name='check'
                    size={18}
                    color='#33d9b2'
                />:
                <Text/>
            } </Text>
        </TouchableOpacity>


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
                        <Text h2>Quiz</Text>

                    </View>
                    <View style={styles.containerCreate}>
                        <Text style={styles.subTitle}>Title and description</Text>
                        <TextInput
                            className='questionInput'
                            style={styles.input}
                            placeholder='Title'
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
                        <Text style={styles.subTitle2}>Questions</Text>
                        <Text style={styles.subTitle3}>Select at least 2 questions</Text>

                        <ScrollView>
                        <View style={styles.container2}>
                            <FlatList
                                className='flatList'
                                data={this.state.dataSource}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={item => this.renderItem(item)}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
                            />
                        </View>
                        </ScrollView>

                        {showErr}
                        {showLoading}

                        <Button
                            buttonStyle={styles.button}
                            className='create-button'
                            title="Next step"
                            onPress={() => {
                                this.handleSubmit()
                            }}/>
                        <Button
                            className='delete-button'
                            buttonStyle={styles.button1}
                            title="Delete"
                            onPress={() => {
                                this.deleteQuiz()
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
    button1: {
        width: 130,
        height: 45,
        marginTop: 10,
        marginBottom: 20,
        margin: 10,
        backgroundColor: '#ff5252',
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
        marginTop: 10,
        marginBottom: 5,
        position: "relative",
        width: 300,
        maxHeight: 200,
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
