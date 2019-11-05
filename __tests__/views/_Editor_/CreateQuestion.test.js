import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CreateQuestion from "../../../app/views/Editor/CreateQuestion";

describe('<CreateQuestion />', () => {
    it('CreateQuestion renders without crashing', () => {
        const rendered = renderer.create(<CreateQuestion />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuestion test against snapshot', () => {
        const welcomePage = renderer.create(<CreateQuestion />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Create new Question', () => {
        let wrapper = shallow(<CreateQuestion/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.create-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuestionsEdit', () => {
        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<CreateQuestion navigation={navigationMock} />);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', () => {
        let createComponent = shallow(<CreateQuestion />);
        createComponent.setState({ error: true });
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('onChangeText and CheckBox', () => {
        let wrapper = shallow(<CreateQuestion/>);
        wrapper.instance().onChangeText = jest.fn();

        let event = 'What is the capital of Spain?';
        wrapper.find('.questionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title','What is the capital of Spain?');

        event = 'Description';
        wrapper.find('.description').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description','Description');

        event = 'Madrid';
        wrapper.find('.title1').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title1','Madrid'); 
        wrapper.find('.correct1').prop('onPress')();
        expect(wrapper.find('.correct1').prop('checked')).toBe(true);

        event = 'London';
        wrapper.find('.title2').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title2','London');
        expect(wrapper.find('.correct2').prop('checked')).toBe(false);

        event = 'Paris';
        wrapper.find('.title3').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title3','Paris');
        expect(wrapper.find('.correct3').prop('checked')).toBe(false);

        event = 'Dublin';
        wrapper.find('.title4').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title4','Dublin');
        expect(wrapper.find('.correct4').prop('checked')).toBe(false);

    });

});
