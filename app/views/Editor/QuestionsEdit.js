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


export default class QuestionsEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    key: '1',
                    name: '¿Cual es la capital de España?',
                    subtitle: 'Puedo poner mas cosas'
                },
                {
                    key: '2',
                    name: '¿Quién invento el teléfono?',
                    subtitle: 'Pulse para abrir'
                },
            ]
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
                            data={this.state.list}
                            renderItem={({item}) => (
                                <ListItem
                                    keyExtractor={item => item.key}
                                    title={item.name}
                                    subtitle={item.subtitle}
                                    bottomDivider
                                    onPress={() => {
                                        this.props.navigation.navigate('CreateQuestion');
                                    }}
                                />
                            )}
                        />

                    </SafeAreaView>
                </ScrollView>
                <ActionButton
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
