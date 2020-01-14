import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, FlatList, StyleSheet, TextInput, View, ScrollView} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements';
import {retrieveItem} from "../../modules/AsyncStorage/retrieve";
import {acceptRe, denyReq} from "../../services/user/reviewerFuncs";

export default class RequestDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: false,
            response: '',
            errorForm: false,
            loading: false,
            token: '',
            closed: false,
            workflowList: '',
            questionInfo: '',
            question: false
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        if (this.props.navigation) {
            this.setState({workflow: this.props.navigation.getParam('workflow', 'default value')});
            this.setState({workflowList: this.props.navigation.getParam('workflowList', 'default value')});
            this.setState({closed: this.props.navigation.getParam('closed', 'default value')});
            this.setState({question: this.props.navigation.getParam('isQuestion')});
            if (this.props.navigation.getParam('isQuestion')) {
                this.setState({questionInfo: this.props.navigation.getParam('question')});
            }
        }
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data)})
                this.setState({loading: false})
            })
    }

    accept() {
        this.setState({loading: true})
        if (this.state.response !== '') {
            acceptRe(this.state.token, this.state.response, this.state.workflow.id)
                .then((data) => {
                    this.setState({loading: false})
                    this.props.navigation.replace('RequestActionConfirm', {type: 'accepted'});
                })
                .catch((error) => {
                    this.setState({errorForm: error.message}),
                        this.setState({loading: false})
                })


        } else {
            this.setState({loading: false})
            this.setState({errorForm: 'Introduzca una respuesta'})
        }

    }

    deny() {
        this.setState({loading: true})
        if (this.state.response !== '') {
            denyReq(this.state.token, this.state.response, this.state.workflow.id)
                .then((data) => {
                    this.setState({loading: false})
                    this.props.navigation.replace('RequestActionConfirm', {type: 'denied'});
                })
                .catch((error) => {
                    this.setState({errorForm: error.message}),
                        this.setState({loading: false})
                })

        } else {
            this.setState({loading: false})
            this.setState({errorForm: 'Introduzca una respuesta'})
        }
    }

    render() {
        let showErr = (
            this.state.errorForm ?
                <View style={styles.error} className='errorShow'>
                    <Text style={{color: 'red'}}>
                        {this.state.errorForm}
                    </Text>
                </View> :
                <View></View>
        );

        let showButtons = (
            !this.state.loading ?
                !this.state.closed ?
                    <View style={styles.containerForm} className='containerButtons'>
                        <View style={styles.containerButtons}>
                            <Button
                                className='accept-button'
                                buttonStyle={styles.button}
                                title="Accept"
                                onPress={() => {
                                    this.accept()
                                }}/>

                            <Button
                                className='deny-button'
                                buttonStyle={styles.buttonDen}
                                title="Deny"
                                onPress={() => {
                                    this.deny()
                                }}/>
                        </View>
                    </View>
                    :
                    <View>
                    </View>
                :
                <View style={styles.horizontal}>
                    <ActivityIndicator animating={this.state.loading} size="large" color="grey"/>
                </View>

        );
        let showInput = (
            !this.state.closed ?
                <TextInput
                    className='responseInput'
                    style={styles.input}
                    multiline={true}
                    placeholder='Response'
                    autoCapitalize="none"
                    placeholderTextColor='darkgrey'
                    onChangeText={val => this.setState({response: val})}
                />
                :
                <View>
                </View>

        );

        let showAns = (
            this.state.question ?
                <View style={styles.containerAns}>
                    <FlatList
                        className='flatList'
                        data={this.state.questionInfo.options}
                        keyExtractor={item => item.title}
                        renderItem={({item}) => (
                            <ListItem
                                className='detail-button'
                                title={item.title}
                                titleStyle={{fontSize: 15}}
                                bottomDivider
                            />
                        )}
                    />
                </View> :
                <View></View>

        );

        let showDetailsText = (
            this.state.question ?
                <Text style={styles.containerRequestDetails}>
                    Status: {this.state.workflow.status}
                    {'\n'}
                    User: {this.state.questionInfo.ownerUserName}
                    {'\n'}{'\n'}
                    Title: {this.state.questionInfo.title}
                    {'\n'}
                    Description: {this.state.questionInfo.description}
                    {'\n'}
                    Answers:
                </Text> :
                <Text style={styles.containerRequestDetails}>
                    Status: {this.state.workflow.status}
                    {'\n'}
                    Description: {this.state.workflow.description}
                </Text>
        );

        let showDetails = (
            this.state.workflow ?
                <View style={styles.containerRequest} className='showDetails'>
                    <Text h4 style={styles.containerSubTitle}>{this.state.workflow.title}</Text>
                    {showDetailsText}

                    {showAns}

                    {showInput}
                    {showErr}
                    {showButtons}
                </View> :
                <View></View>

        );

        let workflowButton = (
            <Button
                className='workflow-button'
                type="clear"
                title="Workflow"
                titleStyle={{color: 'grey'}}
                onPress={() => {
                    let workflowList = [this.state.workflowList];
                    let lastW = this.state.workflowList;

                    if (lastW) {
                        while (lastW.nextWorkflow) {
                            workflowList.push(lastW.nextWorkflow);
                            lastW = lastW.nextWorkflow;
                        }
                    }

                    this.props.navigation.navigate('WorkflowView', {
                        workflow: workflowList,
                    });
                }}/>
        );

        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Details</Text>
                </View>
                <ScrollView>
                    <View style={styles.containerRequest2}>
                        {showDetails}
                        {workflowButton}
                        <View style={styles.containerRequest3}>
                            <Button
                                className='return-button'
                                type="clear"
                                buttonStyle={styles.button2}
                                title="Return"
                                titleStyle={{color: 'grey', fontSize: 20}}
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }
                                }/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //justifyContent: 'center',
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerSubTitle: {
        marginTop: 25
    },
    containerRequest: {
        flex: 1,
        alignItems: 'center',
    },
    containerQuestion: {
        flex: 1,
        alignItems: 'center',
    },
    containerRequest2: {
        flex: 1,
    },
    containerRequest3: {
        alignItems: 'center',
        marginBottom: 10
    },
    containerRequestDetails: {
        marginTop: 25,
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
    },
    input: {
        width: 250,
        height: 80,
        backgroundColor: 'whitesmoke',
        marginTop: 50,
        padding: 8,
        color: 'grey',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    button: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 14
    },
    buttonDen: {
        width: 150,
        height: 55,
        marginTop: 20,
        margin: 10,
        backgroundColor: '#ff5252',
        borderRadius: 14
    },
    button2: {
        marginBottom: 10,
        width: 150,
        height: 55,
        borderRadius: 14
    },
    containerButtons: {
        flexDirection: 'row'
    },
    containerForm: {
        alignItems: 'center',
    },
    error: {
        margin: 10,
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 50,
    },
    containerAns: {
        flex: 1,
        //backgroundColor: "#192338",
        marginTop: 10,
        position: "relative",
        width: 200,
        maxHeight: 400,
    },


})
