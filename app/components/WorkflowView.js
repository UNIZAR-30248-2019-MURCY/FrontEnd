import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, FlatList, StyleSheet, TextInput, View,} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements';

export default class WorkflowView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: [],
            workflow2: [
                {
                    id:1,
                    description:'prueba',
                    response: 'pruebar'
                }
            ],
        }
    }


    componentDidMount() {
        if (this.props.navigation) {
            console.log(this.props.navigation.getParam('workflow', 'default value'));
            this.setState({workflow: this.props.navigation.getParam('workflow', 'default value')});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text h2>Workflow</Text>
                </View>
                <View style={styles.containerWorkflow} className='reqList'>
                    <FlatList
                        className='flatList'
                        data={this.state.workflow}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <ListItem
                                containerStyle={{width: 300}}
                                className='detail-button'
                                title={ 'Description: ' + item.description}
                                titleStyle={{fontSize: 18}}
                                subtitle={item.response ? 'Response: ' + item.response + '\n' + 'Status: ' + item.status :  'Status: ' + item.status }
                                bottomDivider
                            />
                        )}
                    />
                </View>
                <View style={styles.containerReturn}>
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
    containerWorkflow: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    containerReturn: {
        alignItems: 'center',
        marginBottom: 25
    },
})
