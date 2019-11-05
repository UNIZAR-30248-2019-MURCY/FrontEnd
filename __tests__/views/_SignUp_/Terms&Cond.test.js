import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TermsCond from '../../../app/views/SignUp/TermsCond';

describe('<TermsCond />', () => {
    it('TermsCond renders without crashing', () => {
        const rendered = renderer.create(<TermsCond />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('TermsCond test against snapshot', () => {
        const page = renderer.create(<TermsCond />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to SignUp', () => {
        const navigationMock = { replace: jest.fn() };
        const wrapper = shallow(<TermsCond navigation={navigationMock} />);
        wrapper.find('.back-button').simulate('press');
        expect(navigationMock.replace.mock.calls.length).toEqual(1);
        expect(navigationMock.replace.mock.calls[0]).toEqual(['SignUp']);
    })
});
