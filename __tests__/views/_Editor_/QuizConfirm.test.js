import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import QuizConfirm from "../../../app/views/Editor/QuizConfirm";

describe('<QuizConfirm />', () => {
    it('Welcome renders without crashing', () => {
        const rendered = renderer.create(<QuizConfirm/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Welcome test against snapshot', () => {
        const page = renderer.create(<QuizConfirm/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', () => {
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn()
        };
        const wrapper = shallow(<QuizConfirm navigation={navigationMock}/>);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
    })
});
