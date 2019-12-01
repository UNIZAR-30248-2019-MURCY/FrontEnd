import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView
} from 'react-native'
import {Button, Text, ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {listQuestions } from "../../services/quiz/questionFuncs";


export default class QuestionsEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            error: '',
            data: []
        }
    }

    
    componentDidMount() {
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data).jsonWebToken})
                listQuestions(this.state.token)
                    .then((data) => {
                        console.log(data);
                        this.setState( {data: data});
                    })
                    .catch((error) => {
                        this.setState( {error: error.message})
                    })
            })
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.navigation.state.params.reload) {
            retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data).jsonWebToken})
                listQuestions(this.state.token)
                    .then((data) => {
                        console.log(data);
                        this.setState( {data: data});
                    })
                    .catch((error) => {
                        this.setState( {error: error.message})
                    })
            })
        }
    }


    render() {
        return (

            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Questions</Text>
                </View>
                <ScrollView>
                    <SafeAreaView style={styles.containerQuestions}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => (
                                <ListItem
                                    title={item.title}
                                    rightIcon={
                                        <Icon
                                            name="chevron-right"
                                            size={12}
                                            color="grey"
                                        />
                                    }
                                    bottomDivider
                                    onPress={() => {
                                        this.props.navigation.navigate('EditRemoveQuestion', { info: item });
                                    }}
                                />
                            )}
                        />

                    </SafeAreaView>
                </ScrollView>
                <ActionButton
                    className='create-button'
                    hideShadow={true}
                    buttonColor="grey"
                    onPress={() => {
                        this.props.navigation.navigate('CreateQuestion');
                    }}
                />

            </View>


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
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerQuestions: {
        flex: 1,
        marginTop: 20,
    },
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },

})
