import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditRemoveQuestion from "../../../app/views/Editor/EditRemoveQuestion";
import CreateQuestion from "../../../app/views/Editor/CreateQuestion";

describe('<EditRemoveQuestion />', () => {
    it('CreateQuestion renders without crashing', () => {
        const rendered = renderer.create(<EditRemoveQuestion/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuestion test against snapshot', () => {
        const welcomePage = renderer.create(<EditRemoveQuestion/>).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Edit Question', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().editQuestion = jest.fn();
        wrapper.update();
        wrapper.find('.edit-button').simulate('press');
        expect(wrapper.instance().editQuestion).toBeCalledTimes(1);
    });
    it('handleSubmit: Delete Question', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().deleteQuestion = jest.fn();
        wrapper.update();
        wrapper.find('.delete-button').simulate('press');
        expect(wrapper.instance().deleteQuestion).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuestionsEdit', () => {
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<EditRemoveQuestion navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', () => {
        let createComponent = shallow(<EditRemoveQuestion/>);
        createComponent.setState({error: true});
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('should render the Loading component if state.loading is true', () => {
        let createComponent = shallow(<EditRemoveQuestion/>);
        createComponent.setState({loading: true});
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('onChangeText', () => {
        let wrapper = shallow(<EditRemoveQuestion/>);
        wrapper.instance().onChangeText = jest.fn();

        let event = 'What is the capital of Spain?';
        wrapper.find('.questionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title','What is the capital of Spain?');

        event = 'Description';
        wrapper.find('.description').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description','Description');

    });
});
