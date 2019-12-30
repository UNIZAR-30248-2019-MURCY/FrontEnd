import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../modules/QuizzesCards/SliderEntry.style';
import { withNavigation } from 'react-navigation';
import {retrieveItem} from "../modules/AsyncStorage/retrieve";
import {listQuestions} from "../services/question/questionFuncs";

export default class SliderEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colorBack: ''
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
                onPress={() => { this.props.navigation.navigate('QuizPlayScreen',{title: title}); }}
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
                </View>
            </TouchableOpacity>
        );
    }
}

