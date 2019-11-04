import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CreateQuestion from "../../app/views/Editor/CreateQuestion";

describe('<CreateQuestion />', () => {
    it('CreateQuestion renders without crashing', () => {
        const rendered = renderer.create(<CreateQuestion />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuestion test against snapshot', () => {
        const welcomePage = renderer.create(<CreateQuestion />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('Delete question and navigate to QuestionsEdit', () => {
        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<CreateQuestion navigation={navigationMock} />);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    })
});
