import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native'
import {Button, Text, List, ListItem} from 'react-native-elements';

export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list : [
                {
                key:'1',
                  name: '¿Cual es la capital de España?',
                  subtitle: 'Puedo poner mas cosas'
                },
                {
                    key:'2',
                  name: '¿Quién invento el teléfono?',
                  subtitle: 'Pulse para abrir'
                },
              ]
        }
    }


    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerMurcy}>
                    <Text h2>Welcome Editor {"\n"}</Text>
                    <Text h4>Questions:</Text>
                    <FlatList
                        data={this.state.list}
                        renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.subtitle}
                            bottomDivider
                            onPress={() => {
                                this.props.history.push('/createQuestion');
                            }}
                        />
                        )}
                    />
                    <Button
                        className='enter-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Create Question"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            this.props.history.push('/createQuestion');
                        }}/>
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
    containerMurcy: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 100,
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
        width: 250,
        height: 55,
        padding: 8,
    },
    buttonText: {
        fontSize: 25,
        color: 'blue'
    }

})
