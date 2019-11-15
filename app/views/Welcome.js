import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image, ActivityIndicator,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {retrieveItem} from "../services/AsyncStorage/retrieve";
import {getRequestEdit} from "../services/user/userFuncs";

export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this._bootstrapAsync();
    }


    _bootstrapAsync = async () => {
        retrieveItem('token')
            .then(data => {
                if(data){
                    this.setState({loading: false})
                    this.props.navigation.navigate('App');
                }
                else{
                    this.setState({loading: false})
                }

            })
            .catch((error) => {
                this.setState({loading: false})
            })


    };

    render() {
        let showLoading = (
            this.state.loading ?
            <View style={ styles.horizontal}>
                <ActivityIndicator animating={this.state.loading} size="large" color="grey" />
            </View>
                :
                <Button
                    className='enter-button'
                    type="clear"
                    buttonStyle={styles.button}
                    title="Enter"
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        this.props.navigation.navigate('LogIn');
                    }}/>
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerMurcy}>
                    <Image
                        style={styles.logo}
                        source={require('./../assets/images/murcy.png')}
                    />
                    <Text h1>Murcy</Text>
                    {showLoading}
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
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 50,
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
