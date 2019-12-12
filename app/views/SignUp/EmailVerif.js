import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Linking
} from 'react-native'
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {emailVerif} from "../../services/user/userFuncs";
import WEB from '../../config/web';


export default class EmailVerif extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            error: false,
        };

    }
    componentDidMount() {
        if (this.props.navigation) {
            if(this.props.navigation.getParam('token')){
                emailVerif(this.props.navigation.getParam('token'))
                    .then((data) => {
                        this.setState({loading: false})
                    })
                    .catch((error) => {
                        this.setState({error: error.message}),
                            this.setState({loading: false})
                    })
            }
            else{
                this.props.navigation.navigate('AuthLoading');
            }
        }
    }

    render() {
        let showConfirm = (
            this.state.error ?
                <View  style={styles.containerMessage} className='errorShow'>
                        <Icon
                            name='times'
                            size={100}
                        />
                        <Text style={{color: 'grey', fontSize: 19, marginTop:20, textAlign:'center'}} >
                            {this.state.error}
                        </Text>
                        <Button
                            className='return-button'
                            buttonStyle={styles.button}
                            title="Home"
                            onPress={() => {
                                Linking.openURL(WEB.URL)
                            }}/>
                </View> :
                    <View style={styles.containerMessage}>
                        <Icon
                            name='check'
                            size={100}
                        />
                        <Text style={{color: 'grey', fontSize: 19, marginTop:20, textAlign:'center'}} >
                            Your email has been successfully verified
                        </Text>
                        <Button
                            className='return-button'
                            buttonStyle={styles.button}
                            title="Home"
                            onPress={() => {
                                Linking.openURL(WEB.URL)
                            }}/>
                    </View>
        );
        let showLoading = (
            this.state.loading ?
                <View style={[styles.containerMessage, styles.horizontal]}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View>
                    {showConfirm}
                </View>
        );

        return (
            <View style={styles.container}>
                {showLoading}
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
        marginTop: 180,
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
        width: 120,
        height: 40,
        marginTop: 90,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    buttonText: {
        fontSize: 25,
        color: 'grey'
    }

})
