import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditRemoveQuiz2 from "../../../app/views/Editor/quiz/EditRemoveQuiz2";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";

describe('<EditRemoveQuiz2 />', () => {
    it('CreateQuiz renders without crashing', () => {
        const rendered = renderer.create(<EditRemoveQuiz2/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuiz test against snapshot', () => {
        const welcomePage = renderer.create(<EditRemoveQuiz2/>).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Edit Quiz', () => {
        let wrapper = shallow(<EditRemoveQuiz2/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.save-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuizzesEdit', () => {
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<EditRemoveQuiz2 navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', () => {
        let createComponent = shallow(<EditRemoveQuiz2/>);
        createComponent.setState({error: true});
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('should render the Loading component if state.loading is true', () => {
        let createComponent = shallow(<EditRemoveQuiz2/>);
        createComponent.setState({loading: true});
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('showPublish', () => {
        let wrapper = shallow(<EditRemoveQuiz2/>);
        wrapper.instance().setState = jest.fn();
        wrapper.update();
        wrapper.find('SwitchSelector').simulate('press', true);
        expect(wrapper.instance().setState).toBeCalledWith({publish: true});

    });
});


