import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Welcome from '../../app/views/Welcome';
import LogIn from "../../app/views/LogIn/LogIn";

describe('<Welcome />', () => {
    it('Welcome renders without crashing', () => {
        const rendered = renderer.create(<Welcome />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Welcome test against snapshot', () => {
        const welcomePage = renderer.create(<Welcome />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('should navigate to Log In', () => {
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<Welcome navigation={navigationMock} />);
        wrapper.find('.enter-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['LogIn']);
    })
});
