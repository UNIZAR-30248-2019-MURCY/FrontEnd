import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, FlatList, StyleSheet, TextInput, View,} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements';
import {reviewerReqList} from "../../services/user/reviewerFuncs";
import {retrieveItem} from "../../services/AsyncStorage/retrieve";

export default class RequestList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            token: '',
            requests: false,
            errorGettingReq: false,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        retrieveItem('token')
            .then(data => {
                this.setState({token: JSON.parse(data).jsonWebToken})
                reviewerReqList(this.state.token)
                    .then((data) => {
                        this.setState({requests: data})
                        console.log(this.state.requests)
                        this.setState({loading: false})
                    })
                    .catch((error) => {
                        this.setState({errorGettingReq: error.message})
                        this.setState({loading: false})
                    })
            })
    }

    render() {
        let showLoading = (
            <View style={ styles.horizontal}>
                <ActivityIndicator animating={this.state.loading} size="large" color="grey" />
            </View>
        );

        let showReq = (
            this.state.errorGettingReq ?
                <View style={styles.error} className='errorGettingReq'>
                    <Text style={{color: 'red'}}>
                        {this.state.errorGettingReq}
                    </Text>
                </View> :
                !this.state.loading ?
                    <View style={styles.containerRequestExist} className='reqList'>
                        <FlatList
                            className='flatList'
                            data={this.state.requests}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => (
                                <ListItem
                                    className='detail-button'
                                    title={item.description}
                                    titleStyle={{fontSize: 18}}
                                    bottomDivider
                                    onPress={() => {
                                        let workflow = item.workflow;

                                        while(workflow.nextWorkflow !== null){
                                            workflow = workflow.nextWorkflow;
                                        }

                                        this.props.navigation.navigate('RequestDetails', {
                                            workflow: workflow
                                        });
                                    }}
                                />
                            )}
                        />
                    </View>
                    : showLoading
        );
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Requests List</Text>
                </View>
                {showReq}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
        //justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 50,
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    containerRequest: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    containerRequestExist: {
        flex: 1,
        marginTop: 20,
    },
    containerRequestExistContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: 20,
        fontSize: 18,
        color: 'grey',
    },
    cross: {
        marginTop: 50,
        marginBottom: 40,
        marginRight: 10,
        alignItems: 'flex-end',
    },

    logo: {
        marginBottom: 30,
        padding: 8,
        width: 100,
        height: 100
    },
    input: {
        width: 300,
        height: 100,
        backgroundColor: 'whitesmoke',
        margin: 10,
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
    button2: {
        width: 150,
        height: 55,
        borderRadius: 14
    },
    error: {
        margin: 10,
        alignItems: 'center',
    },

})
