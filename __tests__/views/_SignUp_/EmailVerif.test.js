import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EmailVerif from "../../../app/views/SignUp/EmailVerif";

describe('<EmailVerif />', () => {
    it('EmailVerif renders without crashing', () => {
        const rendered = renderer.create(<EmailVerif />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('EmailVerif test against snapshot', () => {
        const page = renderer.create(<EmailVerif />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Welcome', () => {
        const navigationMock = { replace: jest.fn() };
        const wrapper = shallow(<EmailVerif navigation={navigationMock} />);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.replace.mock.calls[0]).toEqual(['Welcome']);
    })
});
