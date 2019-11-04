import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<LogIn />', () => {
    it('LogIn renders without crashing', () => {
        const rendered = renderer.create(<LogIn />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('LogIn test against snapshot', () => {
        const page = renderer.create(<LogIn />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Sign Up', () => {
        const navigationMock = { replace: jest.fn() };
        const wrapper = shallow(<LogIn navigation={navigationMock} />);
        wrapper.find('.signup-button').simulate('press');
        expect(navigationMock.replace.mock.calls.length).toEqual(1);
        expect(navigationMock.replace.mock.calls[0]).toEqual(['SignUp']);
    })
    it('should navigate to Welcome', () => {
        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<LogIn navigation={navigationMock} />);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    })
    it('handleSubmit', () => {
        let wrapper = shallow(<LogIn/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.login-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    })
    it('should render the Error component if state.error is true', () => {
        let loginComponent = shallow(<LogIn />);
        loginComponent.setState({ error: true });
        expect(loginComponent.find('.errorShow').length).toBe(1);
    });
    it('onChangeText', () => {
        let wrapper = shallow(<LogIn/>);
        wrapper.instance().onChangeText = jest.fn();
        let event = 'This is just for test user';
        wrapper.find('.userInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('username','This is just for test user');
        event = 'This is just for test pass';
        wrapper.find('.passInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('password','This is just for test pass');
    });
});
