import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native'
import {Button,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {getQuizId} from "../../services/quiz/quizFuncs";

export default class Points extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: 0
        }
    }

    componentDidMount() {
        if (this.props.navigation) {
            if(this.props.navigation.getParam('points')){
                this.setState({points: this.props.navigation.getParam('points')})
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cross}>
                    <Button
                        className='close-button'
                        type="clear"
                        icon={
                            <Icon
                                name="times"
                                size={30}
                                color="white"
                            />
                        }
                        onPress={() => {
                            this.props.navigation.navigate('AuthLoading');
                        }
                        }
                    />
                </View>

                <View style={styles.containerMessage}>
                    <Icon
                        className='points'
                        name='check'
                        size={100}
                    />
                    <Text style={{color: 'white', fontSize: 150, marginTop:20, textAlign:'center'}} >
                        {this.state.points}
                    </Text>
                    <Text style={{color: 'white', fontSize: 25, marginTop:20, textAlign:'center'}} >
                        questions right!
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    cross: {
        marginTop: 50,
        marginBottom: 40,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    containerMessage: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 15,
        padding: 20
    },
    logo: {
        margin: 30,
        marginBottom: 15,
        padding: 8,
        width: 100,
        height: 100
    },
    button: {
        marginTop: 70,
        width: 150,
        height: 55,
        padding: 8,
    },
    buttonText: {
        fontSize: 25,
        color: 'grey'
    }

})
