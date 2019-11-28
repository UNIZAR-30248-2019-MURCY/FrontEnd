import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EmailConfirm extends Component {

    constructor(props) {
        super(props);
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
                                color="grey"
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
                        className='confirm-email'
                        name='check'
                        size={100}
                    />
                    <Text style={{color: 'grey', fontSize: 19, marginTop:20, textAlign:'center'}} >
                        Check your inbox to verify your email
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        width: 150,
        height: 55,
        padding: 8,
    },
    buttonText: {
        fontSize: 25,
        color: 'grey'
    }

})
