import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RequestConfirm from "../../../app/views/Player/RequestConfirm";

describe('<RequestConfirm />', () => {
    it('Welcome renders without crashing', () => {
        const rendered = renderer.create(<RequestConfirm />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Welcome test against snapshot', () => {
        const page = renderer.create(<RequestConfirm />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', () => {
        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<RequestConfirm navigation={navigationMock} />);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    })
});
