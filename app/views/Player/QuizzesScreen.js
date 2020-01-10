import React, {Component} from 'react';
import {
    View,
    StyleSheet, Platform, ActivityIndicator, Animated, TextInput, TouchableOpacity
} from 'react-native'
import {Button, CheckBox, colors, Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../../modules/QuizzesCards/SliderEntry.style';
import SliderEntry from '../../components/SliderEntry';
import {ENTRIES1, ENTRIES2} from '../../modules/QuizzesCards/entries';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scrollInterpolators, animatedStyles } from '../../modules/QuizzesCards/animations';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {listQuestions} from "../../services/question/questionFuncs";
import {quizSearch} from "../../services/quiz/quizFuncs";
import ActionButton from "react-native-action-button";
import {removeAll} from "../../modules/AsyncStorage/remove";


const WEB = Platform.OS === 'web';

export default class QuizzesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastColor: '',
            loading: false,
            data: [],
            showFilter: false,
            ready: false,
            SlideInLeft: new Animated.Value(0),
            slideUpValue: new Animated.Value(0),
            fadeValue: new Animated.Value(0),
            byTitle: true,
            byDescription: false,
            search:''
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data)})
                quizSearch(this.state.token, 0, 0, 0, this.state.byTitle ? 'title' : 'description', this.state.search)
                    .then((data) => {
                        console.log(data);
                        this.setState({data: data});
                        this.setState({loading: false})
                    })
                    .catch((error) => {
                        this.setState({error: error.message})
                        this.setState({loading: false})
                        removeAll()
                            .then((r) => {
                                if (r) {
                                    this.props.navigation.navigate('Auth');
                                }
                            });

                    })
            })
    }

    search() {
        this.setState({loading: true})
        quizSearch(this.state.token, 0, 0, 0, this.state.byTitle ? 'title' : 'description', this.state.search)
            .then((data) => {
                console.log(data);
                this.setState({data: data});
                this.setState({loading: false})
            })
            .catch((error) => {
                this.setState({error: error.message})
                this.setState({loading: false})
                removeAll()
                    .then((r) => {
                        if (r) {
                            this.props.navigation.navigate('Auth');
                        }
                    });

            })
    }

    _start = () => {
        return Animated.parallel([
            Animated.timing(this.state.slideUpValue, {
                toValue: this.state.showFilter ? 0 : 1 ,
                duration: 120,
                useNativeDriver: true
            })
        ]).start();
    };

    render() {
        let { slideUpValue} = this.state;

        const { navigation } = this.props;

        let showLoading = (
            this.state.loading ?
                <View style={[styles.containerLoading]} className='loadingShow'>
                    <ActivityIndicator animating={this.state.loading} size="large"  color="grey"/>
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
                    <Text h2 style={{fontWeight: '600'}}  >Quizzes</Text>
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
                    <Animated.View
                        style={{

                            transform: [
                                {
                                    translateX: slideUpValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [WEB ? -2000 : -600, 0]
                                    }),
                                }
                            ],
                            width: 250,
                            height: 330,
                            backgroundColor: 'black',
                            marginTop: WEB ? 160 : 250,
                            alignSelf: 'center',
                            position: 'absolute',
                            borderRadius: 14,
                            shadowColor: "#000",
                            shadowOpacity: 0.60,
                            shadowOffset: { width: 0, height: 10 },
                            shadowRadius: 10,
                            elevation: 10,
                        }}
                    >
                        <Text  style={{color:'white', fontSize:30, alignSelf:'center', marginTop:30}}  >Filter</Text>
                        <Text  style={{color:'white', fontSize:22, marginTop:10, marginLeft:30}}  >Order by</Text>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                //backgroundColor: "#192338",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                zIndex: -1,
                                borderRadius: 14}}
                            onPress={() => {
                                this.setState({byTitle: !this.state.byTitle});
                                this.setState({byDescription: !this.state.byDescription});
                            }
                            }
                        >
                            <Text style={{color:'white', fontSize:17, marginTop:10, marginLeft:30}}>  Title    {this.state.byTitle ?
                                <Icon
                                    name='check'
                                    size={18}
                                    color='#33d9b2'
                                />:
                                <Text/>
                            } </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                //backgroundColor: "#192338",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                zIndex: -1,
                                borderRadius: 14}}
                            onPress={() => {
                                this.setState({byTitle: !this.state.byTitle});
                                this.setState({byDescription: !this.state.byDescription});
                            }
                            }
                        >
                            <Text style={{color:'white', fontSize:17, marginTop:10, marginLeft:30}}>  Description    {this.state.byDescription ?
                                <Icon
                                    name='check'
                                    size={18}
                                    color='#33d9b2'
                                />:
                                <Text/>
                            } </Text>
                        </TouchableOpacity>



                        <Text  style={{color:'white', fontSize:22, marginTop:20, marginLeft:30}}  >Search</Text>

                        <TextInput
                            className='title2'
                            style={styles.inputAns}
                            placeholder='Word'
                            placeholderTextColor='darkgrey'
                            onChangeText={val =>  this.setState({search: val})}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            className='search-button'
                            onPress={() => {
                                this.setState({showFilter: !this.state.showFilter});
                                this._start();
                                this.search();
                            }}>
                            <Text  style={{color:'black', fontSize:15, alignSelf:'center', marginTop:6, fontWeight:'bold'}}  >OK</Text>
                        </TouchableOpacity>

                    </Animated.View>


                <ActionButton
                    className='create-button'
                    hideShadow={true}
                    buttonColor="black"
                    size={65}
                    renderIcon={active => active ? (<Icon className='filter-active' name="filter" size={30} color="white"/> ) : (<Icon className='filter-inactive'  name="filter" size={30} color="white"/>)}
                    onPress={() => {
                        this.setState({showFilter: !this.state.showFilter})
                        this._start()
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
        alignItems: 'center',
        padding: 20
    },
    containerTitle: {
        marginTop: 50,
        marginBottom: 10,
        padding: 20,
    },


    containerSettings: {
        padding: 20,
    },
    button: {
        marginTop:20,
        alignSelf: 'center',
        width: 70,
        height: 30,
        backgroundColor: 'white',
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
    containerButtons: {
        flexDirection: 'row'
    },
    inputAns: {
        marginLeft:40,
        width: 150,
        height: 30,
        backgroundColor: 'dimgrey',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 15,
        fontWeight: '500',
    },
    containerLoading: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },


})
