import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Platform} from 'react-native';

import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../modules/QuizzesCards/SliderEntryQuestion.style';
import { withNavigation } from 'react-navigation';
import {retrieveItem} from "../modules/AsyncStorage/retrieve";
import {listQuestions} from "../services/question/questionFuncs";
import {CheckBox} from "react-native-elements";
const WEB = Platform.OS === 'web';

class SliderEntryQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colorBack: '',
            correct1: false,
            correct2: false,
            correct3: false,
        }
    }

    componentDidMount() {
        const colors = ['#40407a', '#706fd3', '#34ace0', '#33d9b2', '#ff5252', '#ff793f', '#ffb142', 'black'];
        const min = 0;
        const max = 7;
        const rand = min + Math.random() * (max - min);
        this.setState({colorBack: colors[Math.round(rand)]})
    }


    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={{ uri: illustration }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={{ uri: illustration }}
                style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even, navigation } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, styles.titleEven ]}
                numberOfLines={5}
            >
                { title.toUpperCase()}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
            >

                <View style={styles.shadow} />

                <View style={[styles.textContainer,  styles.textContainerEven, {backgroundColor: this.state.colorBack} ]}>
                    { uppercaseTitle }
                    <Text
                        style={[styles.subtitle, styles.subtitleEven]}
                        numberOfLines={2}
                    >
                        { subtitle }
                    </Text>

                    <View style={{marginTop: WEB ? 0 : 20}}>
                        <View style={styles2.containerButtons}>
                            <View style={styles2.inputAns}>
                                <Text
                                    style={{fontSize:15, color:'white'}}
                                    numberOfLines={2}
                                >
                                    { subtitle }
                                </Text>
                            </View>

                            <CheckBox value="1"
                                      className='correct1'
                                      containerStyle={styles2.checkBoxC}
                                      checked={this.state.correct1}
                                      onPress={() => this.setState({correct1: !this.state.correct1})}/>
                        </View>

                        <View style={styles2.containerButtons}>
                            <View style={styles2.inputAns}>
                                <Text
                                    style={{fontSize:15, color:'white'}}
                                    numberOfLines={2}
                                >
                                    { subtitle }
                                </Text>
                            </View>

                            <CheckBox value="1"
                                      className='correct1'
                                      containerStyle={styles2.checkBoxC}
                                      checked={this.state.correct2}
                                      onPress={() => this.setState({correct2: !this.state.correct2})}/>
                        </View>

                        <View style={styles2.containerButtons}>
                            <View style={styles2.inputAns}>
                                <Text
                                    style={{fontSize:15, color:'white'}}
                                    numberOfLines={2}
                                >
                                    { subtitle }
                                </Text>
                            </View>

                            <CheckBox value="1"
                                      className='correct1'
                                      containerStyle={styles2.checkBoxC}
                                      checked={this.state.correct3}
                                      onPress={() => this.setState({correct3: !this.state.correct3})}/>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>
        );
    }
}


const styles2 = StyleSheet.create({

    inputAns: {
        width: 200,
        margin: 10,
        padding: 8,

    },

    containerButtons: {
        flexDirection: 'row'
    },
    checkBoxC: {
        padding: 0,
        marginTop: 25,
        alignItems: 'center',
        borderColor: "white"
    },

})


export default SliderEntryQuestion;

