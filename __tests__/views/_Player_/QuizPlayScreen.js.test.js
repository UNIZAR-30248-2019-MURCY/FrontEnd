import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizPlayScreen from "../../../app/views/Player/QuizPlayScreen";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";


describe('<QuizPlayScreen/>', () => {
    it('QuizPlayScreen renders without crashing', async () => {
        const rendered = renderer.create(<QuizPlayScreen/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuizPlayScreen test against snapshot', async () => {
        await retrieveItem();
        const quizPlayScreen = renderer.create(<QuizPlayScreen />).toJSON();
        expect(quizPlayScreen).toMatchSnapshot();
    });
    it('should render the Loading component if state.loading is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<QuizPlayScreen />);
        createComponent.setState({ loading: true });
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('should not render the Loading component if state.loading is false', async () => {
        await retrieveItem();

        let createComponent = shallow(<QuizPlayScreen />);
        createComponent.setState({ loading: false });
        expect(createComponent.find('.loadingShow').length).toBe(0);
    });
    it('Replace and navigate to Points', async () => {
        await retrieveItem();

        const navigationMock = { replace: jest.fn(),
            getParam: jest.fn() };
        const wrapper = shallow(<QuizPlayScreen navigation={navigationMock} />);
        wrapper.setState({
            points:[]
        })
        wrapper.find('.send-button').simulate('press');
        expect(navigationMock.replace.mock.calls.length).toEqual(1);
        expect(navigationMock.replace.mock.calls[0]).toEqual(['Points',{points: 0}]);
    });
});
