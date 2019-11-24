import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image, ActivityIndicator,
    Platform, Linking
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import {retrieveItem} from "../modules/AsyncStorage/retrieve";
import {emailVerif, getRequestEdit} from "../services/user/userFuncs";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        if (this.props.navigation) {
            if(this.props.navigation.getParam('token')){
                this.props.navigation.navigate('EmailVerif', {
                    token: this.props.navigation.getParam('token')
                });
            }
        }
        this._bootstrapAsync();
    }


    _bootstrapAsync = async () => {
        retrieveItem('token')
            .then(data => {
                if (data) {
                    this.setState({loading: false})
                    this.props.navigation.navigate('App');
                } else {
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
                <View style={styles.horizontal}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
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
        let welcomePlatform = (
            Platform.OS === 'web' ?
                <View style={styles.container}>
                    <View style={styles.containerMurcyWeb}>
                        <Image
                            style={styles.logo}
                            source={require('./../assets/images/murcy.png')}
                        />
                        <Text h1>Murcy</Text>
                        {showLoading}
                    </View>
                    <View style={styles.containerDownload}>
                        <Text style={styles.text}>Download our App!</Text>
                        <View style={styles.containerPlatforms}>
                            <View style={styles.itemIcon}>
                                <Button
                                    className='close-button'
                                    type="clear"
                                    icon={
                                        <Icon
                                            name="apple"
                                            size={25}
                                            color="grey"
                                        />
                                    }
                                    onPress={() => {
                                        Linking.openURL('https://expo.io/@javier_mixture/murcy')
                                    }
                                    }
                                />
                            </View>
                            <View style={styles.itemIcon}>
                                <Button
                                    className='close-button'
                                    type="clear"
                                    icon={
                                        <Icon
                                            name="android"
                                            size={25}
                                            color="grey"
                                        />
                                    }
                                    onPress={() => {
                                        Linking.openURL('https://expo.io/@javier_mixture/murcy')
                                    }
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </View>
                :
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
        );

        return (
            welcomePlatform
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
        marginTop: 200,
        padding: 20
    },
    containerMurcyWeb: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 100,
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
        marginTop: 30,
        width: 150,
        height: 55,
        padding: 8,
    },
    buttonText: {
        fontSize: 25,
        color: 'grey'
    },
    containerDownload: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 95,
        padding: 20
    },
    downButton: {
        width: 250,
        height: 55,
        padding: 8,
    },
    text: {
        fontSize: 18,
        color: 'grey'
    },
    containerPlatforms: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    itemIcon: {
        width: '50%' // is 50% of container width
    }

})
