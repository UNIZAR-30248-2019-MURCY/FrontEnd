import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";

describe('<RequestDetails />', () => {
    it('RequestDetails renders without crashing', () => {
        const page = renderer.create(<RequestDetails/>).toJSON();
        expect(page).toBeTruthy();
    });
    it('RequestDetails test against snapshot', () => {
        const page = renderer.create(<RequestDetails/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', async () => {
        await retrieveItem();
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<RequestDetails navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    });
    it('should go to Workflow View', async () => {
        await retrieveItem();
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn(),
        };
        let wrapper = shallow(<RequestDetails navigation={navigationMock}/>);
        wrapper.setState({
            workflowList: {
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
        });
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
        wrapper.find('.workflow-button').simulate('press');
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['WorkflowView', workflowList]);
    });

    it('should show details', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestDetails/>);
        wrapper.setState({
            workflow: true,
        });
        expect(wrapper.find('.showDetails').length).toBe(1);
    });

    it('should show error', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestDetails/>);
        wrapper.setState({
            workflow: true,
            errorForm: true
        });
        expect(wrapper.find('.errorShow').length).toBe(1);
    });

    it('should show buttons', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestDetails/>);
        wrapper.setState({
            workflow: true,
            loading: false,
            closed: false
        });
        expect(wrapper.find('.containerButtons').length).toBe(1);
    });
});
