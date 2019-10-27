import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SignUp from "../../app/views/SignUp";

describe('<SignUp />', () => {
    it('SignUp renders without crashing', () => {
        const rendered = renderer.create(<SignUp />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SignUp test against snapshot', () => {
        const welcomePage = renderer.create(<SignUp />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('should navigate to Log In', () => {
        const historyMock = { replace: jest.fn() };
        const wrapper = shallow(<SignUp history={historyMock} />);
        wrapper.find('.login-button').simulate('press');
        expect(historyMock.replace.mock.calls.length).toEqual(1);
        expect(historyMock.replace.mock.calls[0]).toEqual(['/login']);
    })
});
