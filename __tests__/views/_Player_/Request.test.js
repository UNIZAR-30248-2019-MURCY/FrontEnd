import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Request from '../../../app/views/Player/Request';
import {retrieveItem} from "../../../app/services/AsyncStorage/retrieve";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<Request />', () => {
    it('Request renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<Request/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Request test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<Request/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', async () => {
        await retrieveItem();
        const navigationMock = {goBack: jest.fn()};
        const wrapper = shallow(<Request navigation={navigationMock}/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: false});
        wrapper.find('.cancel-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    });
    it('should go back', async () => {
        await retrieveItem();
        const navigationMock = {goBack: jest.fn()};
        const wrapper = shallow(<Request navigation={navigationMock}/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: true});
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    });
    it('handleSubmit: create request', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: false});
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.send-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('onChangeText', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.instance().onChangeText = jest.fn();
        let event = 'This is just for test description';
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: false});
        wrapper.find('.descriptionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description', 'This is just for test description');
    });
    it('should  render the request if state.request is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: true});
        expect(wrapper.find('.requestShow').length).toBe(1);
    });
    it('should  render the request approved if state.request.approved is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                approved: true,
                closed: true
            }
        });
        expect(wrapper.find('.requesApproved').length).toBe(1);
    });
    it('should  render the request denied if state.request.approved is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                approved: false,
                closed: true
            }
        });
        expect(wrapper.find('.requesDenied').length).toBe(1);
    });
    it('should  render the reReq form if state.request.approved is false and this.state.reRequest is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                approved: false,
                closed: true
            }
        });
        wrapper.setState({reRequest: true});
        expect(wrapper.find('.editCreateReq').length).toBe(1);
    });
    it('handleSubmit: reRequest', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                approved: false,
                closed: true
            }
        });
        wrapper.find('.reReq-button').simulate('press');
        expect(wrapper.state().reRequest).toEqual(true);
    });


    it('should  render the edit mode if state.request.closed is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                closed: false
            }
        });
        expect(wrapper.find('.editMode').length).toBe(1);
    });

    it('should  render the edit form if state.request.closed is false and this.state.editing is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                closed: false
            }
        });
        wrapper.setState({editing: true});
        expect(wrapper.find('.editCreateReq').length).toBe(1);
    });

    it('handleSubmit: edit request', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({
            request: {
                closed: false
            }
        });
        wrapper.find('.edit-button').simulate('press');

        expect(wrapper.state().editing).toEqual(true);
    });


    it('should render the Error component if state.errorForm is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: false});
        wrapper.setState({loading: false});
        wrapper.setState({request: false});
        wrapper.setState({errorForm: true});
        expect(wrapper.find('.errorShow').length).toBe(1);
    });
    it('should render the ErrorGettingReq if state.errorGettingReq is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<Request/>);
        wrapper.setState({errorGettingReq: true});
        wrapper.setState({loading: false});
        wrapper.setState({request: false});
        wrapper.setState({errorForm: true});
        expect(wrapper.find('.errorGettingReq').length).toBe(1);
    });
});

