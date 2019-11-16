import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EmailConfirm from "../../../app/views/SignUp/EmailConfirm";

describe('<EmailConfirm />', () => {
    it('EmailConfirm renders without crashing', () => {
        const rendered = renderer.create(<EmailConfirm />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('EmailConfirm test against snapshot', () => {
        const page = renderer.create(<EmailConfirm />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Welcome', () => {
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<EmailConfirm navigation={navigationMock} />);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
    })
});
