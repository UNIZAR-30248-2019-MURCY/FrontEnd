import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Points from "../../../app/views/Player/Points";
import QuestionConfirm from "../../../app/views/Editor/question/QuestionConfirm";

describe('<Points />', () => {
    it('Points renders without crashing', () => {
        const rendered = renderer.create(<Points />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Points test against snapshot', () => {
        const page = renderer.create(<Points />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', () => {
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn()
        };
        const wrapper = shallow(<Points navigation={navigationMock}/>);
        wrapper.find('.close-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
})
});
