import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";

export default class QuizzesScreen extends Component {

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
                    <Icon
                        name='wrench'
                        size={100}
                    />
                    <Text style={{color: 'grey', fontSize: 19, marginTop:20, textAlign:'center'}} >
                        We are working on it
                    </Text>
                </View>
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
