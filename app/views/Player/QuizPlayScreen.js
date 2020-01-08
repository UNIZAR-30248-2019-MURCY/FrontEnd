import React, {Component} from 'react';
import {
    View,
    StyleSheet, Platform, ActivityIndicator,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../../modules/QuizzesCards/SliderEntry.style';
import SliderEntryQuestion from '../../components/SliderEntryQuestion';
import {ENTRIES1, ENTRIES2} from '../../modules/QuizzesCards/entries';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scrollInterpolators, animatedStyles } from '../../modules/QuizzesCards/animations';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {getQuizId, quizSearch} from "../../services/quiz/quizFuncs";

const WEB = Platform.OS === 'web';

export default class QuizPlayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            id: '',
            data:{
                questions:[]
            }
        }
    }

    componentDidMount() {
        if (this.props.navigation) {
            if(this.props.navigation.getParam('title')){
                this.setState({title: this.props.navigation.getParam('title')})

                this.setState({loading: true})
                retrieveItem('token')
                    .then(data => {
                        this.setState({token: JSON.parse(data)})
                        getQuizId(this.state.token, this.props.navigation.getParam('id'))
                            .then((data) => {
                                console.log(data);
                                this.setState({data: data});
                                this.setState({loading: false})
                            })
                            .catch((error) => {
                                this.setState({error: error.message})
                                this.setState({loading: false})
                            })
                    })
            }
        }
    }

    __renderItem({item, index}) {
        return <SliderEntryQuestion data={item} even={(index + 1) % 2 === 0}/>;
    }


    render() {
        const { color } = this.props;

        let showLoading = (
            this.state.loading ?
                <View style={[styles.containerLoading]} className='loadingShow'>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View> :
                <View></View>
        );

        let buttons = (
            WEB ?
                <View style={styles.containerButton}>
                    <View style={styles.buttonContainer}>
                        <Button icon={
                            <Icon
                                name="arrow-left"
                                size={18}
                                color="white"
                            />
                        }
                                buttonStyle={styles.buttonPrevNext}
                                className='add-button'
                                onPress={() => {
                                    this.refs.carousel.snapToPrev();
                                }}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button icon={
                            <Icon
                                name="arrow-right"
                                size={18}
                                color="white"
                            />
                        }
                                buttonStyle={styles.buttonPrevNext}
                                className='remove-button'
                                onPress={() => {
                                    this.refs.carousel.snapToNext();
                                }}/>
                    </View>
                </View>:
                <View></View>
        );

        return (
            <View style={styles.containerUp}>
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
                            this.props.navigation.goBack()
                        }
                        }
                    />
                </View>
                <View style={styles.container}>

                <View style={styles.containerTitle}>
                    <Text h3 style={{color: 'white', fontWeight: 'bold'}} numberOfLines={2} >{this.state.title}</Text>
                </View>
                    {showLoading}

                <Carousel
                    ref={'carousel'}
                    data={this.state.data.questions}
                    renderItem={this.__renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    layout={'stack'}
                    scrollInterpolator={scrollInterpolators[`scrollInterpolator1`] }
                    slideInterpolatedStyle={ animatedStyles[`animatedStyles1`] }
                />
                {buttons}

                <View style={styles.sendContainer}>
                    <Button icon={
                        <Icon
                            name="paper-plane"
                            size={22}
                            color="white"
                        />
                    }
                            buttonStyle={styles.buttonSend}
                            className='remove-button'
                            onPress={() => {
                                this.refs.carousel.snapToNext();
                            }}/>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cross: {
        marginTop: 30,
        marginBottom: 0,
        marginRight: 30,
        alignItems: 'flex-end',
    },
    containerUp: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: 'black'
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black'
    },
    containerTitle: {
        marginTop: 0,
        marginBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
    },

    containerSettings: {
        padding: 20
    },
    button: {
        width: 200,
        height: 50,
        marginTop: 30,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    buttonText: {
        fontSize: 20,
        color: 'grey'
    },
    buttonSO: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendContainer: {
        marginBottom: WEB ? 7 : 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    buttonPrevNext: {
        width: 120,
        height: 35,
        marginTop: 10,
        margin: 10,
        backgroundColor: 'black',
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    buttonSend: {
        width: 60,
        height: 40,
        marginTop: 10,
        margin: 10,
        backgroundColor: 'black',
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: 'white'
    },


})
