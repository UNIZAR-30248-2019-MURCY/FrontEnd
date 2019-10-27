import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Welcome from '../../app/views/Welcome';
import LogIn from "../../app/views/LogIn";

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
        const historyMock = { push: jest.fn() };
        const wrapper = shallow(<Welcome history={historyMock} />);
        wrapper.find('.enter-button').simulate('press');
        expect(historyMock.push.mock.calls.length).toEqual(1);
        expect(historyMock.push.mock.calls[0]).toEqual(['/login']);
    })
});
