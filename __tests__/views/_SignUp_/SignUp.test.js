import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SignUp from "../../../app/views/SignUp/SignUp";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<SignUp />', () => {
    it('SignUp renders without crashing', () => {
        const rendered = renderer.create(<SignUp />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SignUp test against snapshot', () => {
        const page = renderer.create(<SignUp />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Log In', () => {
        const navigationMock = { replace: jest.fn() };
        const wrapper = shallow(<SignUp navigation={navigationMock} />);
        wrapper.find('.login-button').simulate('press');
        expect(navigationMock.replace.mock.calls.length).toEqual(1);
        expect(navigationMock.replace.mock.calls[0]).toEqual(['LogIn']);
    })
    it('should navigate to Welcome', () => {
        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<SignUp navigation={navigationMock} />);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    })
    it('handleSubmit', () => {
        let wrapper = shallow(<SignUp/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.signup-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    })
    it('should render the Error component if state.error is true', () => {
        let loginComponent = shallow(<SignUp />);
        loginComponent.setState({ error: true });
        expect(loginComponent.find('.errorShow').length).toBe(1);
    });
    it('onChangeText', () => {
        let wrapper = shallow(<SignUp/>);
        wrapper.instance().onChangeText = jest.fn();
        let event = 'This is just for test user';
        wrapper.find('.userInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('username','This is just for test user');
        event = 'This is just for test email';
        wrapper.find('.emailInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('email','This is just for test email');
        event = 'This is just for test pass';
        wrapper.find('.passInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('password','This is just for test pass');
        event = 'This is just for test passrep';
        wrapper.find('.passrepInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('password2','This is just for test passrep');
        event = 'This is just for test name';
        wrapper.find('.nameInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('fullName','This is just for test name');
    });
});
