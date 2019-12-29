import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CreateQuiz from "../../../app/views/Editor/quiz/CreateQuiz";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";


describe('<CreateQuiz />', () => {
    it('CreateQuestion renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<CreateQuiz />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuiz test against snapshot', async () => {
        await retrieveItem();
        const welcomePage = renderer.create(<CreateQuiz />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Create new Quiz', async () => {
        await retrieveItem();

        let wrapper = shallow(<CreateQuiz/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.create-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuizzesEdit', async () => {
        await retrieveItem();

        const navigationMock = { goBack: jest.fn() };
        const wrapper = shallow(<CreateQuiz navigation={navigationMock} />);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<CreateQuiz />);
        createComponent.setState({ error: true });
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('should render the Loading component if state.loading is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<CreateQuiz />);
        createComponent.setState({ loading: true });
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('onChangeText', async () => {
        await retrieveItem();

        let wrapper = shallow(<CreateQuiz/>);
        wrapper.instance().onChangeText = jest.fn();

        let event = 'Quiz1';
        wrapper.find('.questionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title','Quiz1');

        event = 'Description';
        wrapper.find('.description').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description','Description');
    });

    it('flatList', async () => {
        await retrieveItem();
        let wrapper = shallow(<CreateQuiz/>);
        expect(wrapper.find('FlatList').length).toBe(1);
        const key = wrapper.find('FlatList').props().keyExtractor({id: 1});
        expect(key).toEqual('1')
    });

    
});
