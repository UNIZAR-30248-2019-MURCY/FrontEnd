import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditRemoveQuestion from "../../../app/views/Editor/EditRemoveQuestion";
import CreateQuestion from "../../../app/views/Editor/CreateQuestion";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";

describe('<EditRemoveQuestion />', () => {
    it('CreateQuestion renders without crashing', () => {
        const rendered = renderer.create(<EditRemoveQuestion/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuestion test against snapshot', () => {
        const welcomePage = renderer.create(<EditRemoveQuestion/>).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Edit Question', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().editQuestion = jest.fn();
        wrapper.update();
        wrapper.find('.edit-button').simulate('press');
        expect(wrapper.instance().editQuestion).toBeCalledTimes(1);
    });
    it('handleSubmit: Delete Question', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().deleteQuestion = jest.fn();
        wrapper.update();
        wrapper.find('.delete-button').simulate('press');
        expect(wrapper.instance().deleteQuestion).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuestionsEdit', () => {
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<EditRemoveQuestion navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', () => {
        let createComponent = shallow(<EditRemoveQuestion/>);
        createComponent.setState({error: true});
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('should render the Loading component if state.loading is true', () => {
        let createComponent = shallow(<EditRemoveQuestion/>);
        createComponent.setState({loading: true});
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('onChangeText', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().onChangeText = jest.fn();

        let event = 'What is the capital of Spain?';
        wrapper.find('.questionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title', 'What is the capital of Spain?');

        event = 'Description';
        wrapper.find('.description').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description', 'Description');

    });
    it('showDraft', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.setState({showPublish: true});
        wrapper.instance().setState = jest.fn();
        wrapper.update();
        wrapper.find('.selector-button').simulate('press', false);
        expect(wrapper.instance().setState).toBeCalledWith({publish: false});

    });
    it('should go to Workflow View', async () => {
        await retrieveItem();
        let info = {
            approved: false,
            closed: false,
            description: "D3",
            id: 108,
            ownerId: 9,
            ownerUserName: "javier",
            title: "T3",
            options: [],
            lastWorkflow: {
                description: null,
                id: 105,
                nextWorkflow: null,
                response: null,
                status: "PENDING",
                statusBy: null,
                statusDate: "2019-12-08T14:29:07.809+0000",
                title: "Solicitud publicar pregunta"
            },

            workflow: {
                description: "Prueba petición",
                id: 1,
                nextWorkflow: {
                    description: "Prueba petición",
                    id: 2,
                    nextWorkflow: null,
                    response: "Prueba",
                    status: "APPROVED",
                    statusBy: "test",
                    statusDate: "2019-11-26T10:27:05.853+0000",
                    title: "Solicitud para ser editor",
                },
                response: "Prueba",
                status: "APPROVED",
                statusBy: "test",
                statusDate: "2019-11-26T10:27:05.853+0000",
                title: "Solicitud para ser editor",
            }
        }
        let workflowList = {
            workflow: [{
                description: "Prueba petición",
                id: 1,
                nextWorkflow: {
                    description: "Prueba petición",
                    id: 2,
                    nextWorkflow: null,
                    response: "Prueba",
                    status: "APPROVED",
                    statusBy: "test",
                    statusDate: "2019-11-26T10:27:05.853+0000",
                    title: "Solicitud para ser editor",
                },
                response: "Prueba",
                status: "APPROVED",
                statusBy: "test",
                statusDate: "2019-11-26T10:27:05.853+0000",
                title: "Solicitud para ser editor",
            },
                {
                    description: "Prueba petición",
                    id: 2,
                    nextWorkflow: null,
                    response: "Prueba",
                    status: "APPROVED",
                    statusBy: "test",
                    statusDate: "2019-11-26T10:27:05.853+0000",
                    title: "Solicitud para ser editor",
                }]
        }
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn((param) => info),
        };
        let wrapper = shallow(<EditRemoveQuestion navigation={navigationMock}/>);
        wrapper.update();
        wrapper.find('.workflow-button').simulate('press');
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['WorkflowQuestionView', workflowList]);
    });

});


