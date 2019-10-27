import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LogIn from "../../app/views/LogIn";

describe('<LogIn />', () => {
    it('LogIn renders without crashing', () => {
        const rendered = renderer.create(<LogIn />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('LogIn test against snapshot', () => {
        const welcomePage = renderer.create(<LogIn />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('should navigate to Sign Up', () => {
        const historyMock = { replace: jest.fn() };
        const wrapper = shallow(<LogIn history={historyMock} />);
        wrapper.find('.signup-button').simulate('press');
        expect(historyMock.replace.mock.calls.length).toEqual(1);
        expect(historyMock.replace.mock.calls[0]).toEqual(['/signup']);
    })
});
