import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';

export default class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerMurcy}>
                    <Image
                        style={styles.logo}
                        source={require('./../assets/images/murcy.png')}
                    />
                    <Text h1>Murcy</Text>
                    <Button
                        className='enter-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Enter"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            this.props.navigation.navigate('LogIn');
                        }}/>
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
    containerMurcy: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 160,
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
