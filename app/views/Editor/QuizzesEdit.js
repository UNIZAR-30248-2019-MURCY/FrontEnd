import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class QuestionsEdit extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Quizzes</Text>
                </View>

                <View style={styles.containerMessage}>
                    <Text style={{color: 'grey', fontSize: 19, marginTop:20, textAlign:'center'}} >
                        We are working on it
                    </Text>
                </View>
                <Icon
                        name='wrench'
                        size={100}
                    />
                    <ActionButton
                    className='create-button'
                    hideShadow={true}
                    buttonColor="grey"
                    onPress={() => {
                        this.props.navigation.navigate('CreateQuiz');
                    }}
                />
            </View>

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
    containerMessage: {
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 130,
        padding: 20
    },


})
