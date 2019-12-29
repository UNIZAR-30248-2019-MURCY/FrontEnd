import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import QuestionConfirm from "../../../app/views/Editor/question/QuestionConfirm";

describe('<QuestionConfirm />', () => {
    it('Welcome renders without crashing', () => {
        const rendered = renderer.create(<QuestionConfirm/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Welcome test against snapshot', () => {
        const page = renderer.create(<QuestionConfirm/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', () => {
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn()
        };
        const wrapper = shallow(<QuestionConfirm navigation={navigationMock}/>);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
    })
});
