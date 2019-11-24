import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import RequestActionConfirm from "../../../app/views/Reviewer/RequestActionConfirm";

describe('<RequestActionConfirm />', () => {
    it('RequestActionConfirm renders without crashing', () => {
        const rendered = renderer.create(<RequestActionConfirm/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('RequestActionConfirm test against snapshot', () => {
        const page = renderer.create(<RequestActionConfirm/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', () => {
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn()
        };
        const wrapper = shallow(<RequestActionConfirm navigation={navigationMock}/>);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    })
});
