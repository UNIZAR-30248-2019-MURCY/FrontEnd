import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Platform, FlatList} from 'react-native';

import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../modules/QuizzesCards/SliderEntryQuestion.style';
import {withNavigation} from 'react-navigation';
import {retrieveItem} from "../modules/AsyncStorage/retrieve";
import {listQuestions} from "../services/question/questionFuncs";
import {CheckBox} from "react-native-elements";

const WEB = Platform.OS === 'web';

class SliderEntryQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colorBack: '',
            options: [],
            points: 1
        }
    }


    componentDidMount() {
        const colors = ['#40407a', '#706fd3', '#34ace0', '#33d9b2', '#ff5252', '#ff793f', '#ffb142'];
        const min = 0;
        const max = 6;
        const rand = min + Math.random() * (max - min);
        this.setState({colorBack: colors[Math.round(rand)]})
        this.rellenar()
    }

    rellenar(){
        var options=[];
        this.props.data.options.map(function(element, indice){
            options.push({title: element.title, correct: element.correct, isSelected: false})
        })
        this.setState({options: options});
    }

    checkPoints(){
        let points = 1;
        this.state.options.map(function(element, indice){
            if(element.correct !== element.isSelected){
                points = 0
            }
        })
        return points
    }
    render() {
        const {data: {id, title, description, isMultiple}} = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, styles.titleEven]}
                numberOfLines={5}
            >
                {title.toUpperCase()}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
            >

                <View style={styles.shadow}/>

                <View style={[styles.textContainer, styles.textContainerEven, {backgroundColor: this.state.colorBack}]}>
                    {uppercaseTitle}
                    <Text
                        style={[styles.subtitle, styles.subtitleEven]}
                        numberOfLines={2}
                    >
                        {description}
                    </Text>

                    <Text
                        style={[styles.subtitle, styles.subtitleEven]}
                        numberOfLines={1}
                    >
                        {isMultiple ? '(Multiple choice)' : '(Single choice)'}
                    </Text>

                    <View style={{marginTop: WEB ? 0 : 20}}>

                        <FlatList
                            data={this.state.options}
                            keyExtractor={item => item.title}
                            renderItem={({item, index}) => (

                                <View style={styles2.containerButtons}>
                                    <View style={styles2.inputAns}>
                                        <Text
                                            style={{fontSize: 15, color: 'white'}}
                                            numberOfLines={2}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>

                                    <CheckBox value="1"
                                              checkedIcon= {isMultiple ? 'check-square-o' : 'dot-circle-o'}
                                              uncheckedIcon= {isMultiple ? 'square-o' : 'circle-o'}
                                              checkedColor='white'
                                              uncheckedColor='white'
                                              className='correct1'
                                              containerStyle={styles2.checkBoxC}
                                              checked={item.isSelected}
                                              onPress={() => {
                                                  const copyOptions = [...this.state.options];

                                                  if(!copyOptions[index].isSelected && !isMultiple){
                                                      copyOptions.map(function(element, indice){
                                                          copyOptions[indice].isSelected = false;
                                                      })
                                                  }

                                                  copyOptions[index].isSelected = !copyOptions[index].isSelected;

                                                  this.setState({
                                                      options: copyOptions,
                                                  });
                                                  console.log(this.props)
                                                  this.props.points(id, this.checkPoints())
                                              }}/>
                                </View>
                            )}
                        />
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}


const styles2 = StyleSheet.create({

    inputAns: {
        marginLeft:20,
        width: 200,
        justifyContent: 'center',
    },

    containerButtons: {
        flexDirection: 'row',
    },
    checkBoxC: {
        padding: 0,
        //marginTop: 25,
        alignItems: 'center',
        borderColor: "white"
    },

})


export default SliderEntryQuestion;

