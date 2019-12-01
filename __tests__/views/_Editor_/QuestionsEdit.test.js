import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuestionsEdit from "../../../app/views/Editor/QuestionsEdit";

describe('<QuestionsEdit />', () => {
    it('QuestionsEdit renders without crashing', () => {
        const rendered = renderer.create(<QuestionsEdit />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuestionsEdit test against snapshot', () => {
        const welcomePage = renderer.create(<QuestionsEdit />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('Button Create Question', () => {
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<QuestionsEdit navigation={navigationMock} />);
        wrapper.find('.create-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['CreateQuestion']);
    });
});
