import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import QuestionRequestList from "../../../app/views/Reviewer/QuestionReqList";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<QuestionRequestList />', () => {
    it('QuestionRequestList renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<QuestionRequestList/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuestionRequestList test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<QuestionRequestList/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should render the errorGettingReq if state.errorGettingReq is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.setState({errorGettingReq: 'Error'});
        expect(wrapper.find('.errorGettingReq').length).toBe(1);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.setState({ errorGettingReq: false });
        wrapper.setState({ loading: false });
        expect(wrapper.find('.reqList').length).toBe(1);
    });
    it('filter-button', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.instance().reload = jest.fn();
        wrapper.update();
        wrapper.find('.accepted-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(1);
        wrapper.find('.denied-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(2);
        wrapper.find('.opened-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(3);

    });
});
