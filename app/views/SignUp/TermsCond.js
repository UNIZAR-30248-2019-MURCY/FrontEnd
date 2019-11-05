import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native'
import {Button, colors, Text} from 'react-native-elements';

export default class Terms extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.containerTitle}>
                    <Text h2>Terms and conditions</Text>
                </View>

                <View style={styles.containerMurcy}>
                    <View>
                        <Text> These Terms and Conditions regulate the download, access and use of the MURCY application.</Text>
                        <Text> Access to the MURCY assumes that the user acknowledges that he has accepted and consented
                            without reservation of the present conditions of use.</Text>
                        <Text h5>1. OBJECTIVE </Text>
                        <Text> The MURCY application has the objective of entertainment.</Text>
                        <Text> It is an application for all audiences. In the design
                            and development of this application have participated specialized professionals.</Text>
                        <Text> The MURCY is made available to users for personal (never business) use.</Text>
                        <Text> It works on Web and an Android and iOS mobile phone.</Text>
                        <Text h5>2. INTELLECTUAL AND INDUSTRIAL PROPERTY RIGHTS </Text>
                        <Text> The user acknowledges that the reproduction, modification, distribution, commercialization, decompilation,
                             disassembly, use of reverse engineering techniques or any other means to obtain the source code,
                             transformation or publication of any results of tests of unauthorized references of any of the elements
                             and utilities integrated within the development constitutes an infringement of the intellectual
                             property rights of MURCY, being obliged, consequently, not to perform any of the aforementioned actions.</Text>
                        <Text h5>3. PRIVACY POLICY </Text>
                        <Text> MURCY may use personal information for internal purposes, such as statistics.
                            MURCY may collect, store or accumulate certain non-personal information regarding its use.</Text>
                        <Text> MURCY reserves the right to edit, update, modify, suspend, delete or terminate the services offered by
                            the Application, including all or part of its content, without prior notice, as well as to modify the form
                            or type of access to it. The possible causes of modification may take place, for reasons such as its
                            adaptation to possible legislative developments and changes in the Application itself, as well as to
                            those that may derive from the existing standard codes in the matter or for strategic or corporate reasons .</Text>
                        <Text> MURCY will not be responsible for the use of the application by a minor, being the download and use of
                            the application of the exclusive responsibility of the user.</Text>
                        </View>
                    <Button
                        className='back-button'
                        type="clear"
                        buttonStyle={styles.button}
                        title="Return"
                        titleStyle={styles.buttonText}
                        onPress={() => {
                            this.props.navigation.replace('SignUp');
                        }}/>
                </View>
                </ScrollView>
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
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerMurcy: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 10,
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
        marginTop: 40,
        width: 150,
        height: 55,
        padding: 8,
    },
    buttonText: {
        fontSize: 25,
        color: 'grey'
    }

})
