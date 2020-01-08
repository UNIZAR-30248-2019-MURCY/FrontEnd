import React, {Component} from 'react';
import {
    View,
    StyleSheet, Platform, ActivityIndicator,
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../../modules/QuizzesCards/SliderEntry.style';
import SliderEntry from '../../components/SliderEntry';
import {ENTRIES1, ENTRIES2} from '../../modules/QuizzesCards/entries';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scrollInterpolators, animatedStyles } from '../../modules/QuizzesCards/animations';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {listQuestions} from "../../services/question/questionFuncs";
import {quizSearch} from "../../services/quiz/quizFuncs";

const WEB = Platform.OS === 'web';

export default class QuizzesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastColor: '',
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data)})
                quizSearch(this.state.token, 0, 0, 0, 0, 0)
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

    render() {
        const { navigation } = this.props;

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
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Quizzes</Text>
                </View>
                {showLoading}
                <Carousel
                    ref={'carousel'}
                    data={this.state.data}
                    renderItem=
                        {({item, index}) => (
                            <SliderEntry  navigation={navigation} data={item} even={(index + 1) % 2 === 0}/>
                        )}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    layout={'stack'}
                    scrollInterpolator={ WEB ? scrollInterpolators[`scrollInterpolator1`] : null  }
                    slideInterpolatedStyle={ WEB ? animatedStyles[`animatedStyles1`] : null  }
                />
                {buttons}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    containerTitle: {
        marginTop: 50,
        marginBottom: 10,
        padding: 20
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
        marginBottom:18
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrevNext: {
        width: 120,
        height: 35,
        marginTop: 10,
        margin: 10,
        backgroundColor: 'black',
        borderRadius: 14
    },


})
