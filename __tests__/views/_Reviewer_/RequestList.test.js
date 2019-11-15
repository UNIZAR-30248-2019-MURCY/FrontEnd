import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import RequestList from "../../../app/views/Reviewer/RequestList";
import {retrieveItem} from "../../../app/services/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<RequestList />', () => {
    it('RequestList renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<RequestList/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('RequestList test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<RequestList/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should render the errorGettingReq if state.errorGettingReq is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
        wrapper.setState({errorGettingReq: 'Error'});
        expect(wrapper.find('.errorGettingReq').length).toBe(1);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
        wrapper.setState({ errorGettingReq: false });
        wrapper.setState({ loading: false });
        expect(wrapper.find('.reqList').length).toBe(1);
    });
});
