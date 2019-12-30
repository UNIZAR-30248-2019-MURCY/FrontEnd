import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../modules/QuizzesCards/SliderEntry.style';

export default class SliderEntry extends Component {


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
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, styles.titleEven ]}
                numberOfLines={5}
            >
                { title.toUpperCase()}
            </Text>
        ) : false;

        function colorRand () {
            const colors = ['#40407a', '#706fd3', '#34ace0', '#33d9b2', '#ff5252', '#ff793f', '#ffb142', 'black'];
            const min = 0;
            const max = 7;
            const rand = min + Math.random() * (max - min);
            return colors[Math.round(rand)];
        }

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${title}'`); }}
            >
                <View style={styles.shadow} />

                <View style={[styles.textContainer,  styles.textContainerEven, {backgroundColor: colorRand()} ]}>
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
