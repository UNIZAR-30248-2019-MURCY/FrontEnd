import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CreateQuiz2 from "../../../app/views/Editor/quiz/CreateQuiz2";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import CreateQuiz from "../../../app/views/Editor/quiz/CreateQuiz";
import EditRemoveQuestion from "../../../app/views/Editor/question/EditRemoveQuestion";


describe('<CreateQuiz2 />', () => {
    it('CreateQuestion renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<CreateQuiz2 />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuiz2 test against snapshot', async () => {
        await retrieveItem();
        const welcomePage = renderer.create(<CreateQuiz2 />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Create new Quiz', async () => {
        await retrieveItem();

        let wrapper = shallow(<CreateQuiz2/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.create-quiz-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuizzesEdit', async () => {
        await retrieveItem();

        const navigationMock = { goBack: jest.fn(), getParam: jest.fn() };
        const wrapper = shallow(<CreateQuiz2 navigation={navigationMock} />);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<CreateQuiz2 />);
        createComponent.setState({ error: true });
        expect(createComponent.find('.errorShow').length).toBe(1);
    });
    it('should render the Loading component if state.loading is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<CreateQuiz2 />);
        createComponent.setState({ loading: true });
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });

    it('showPublish', () => {
        let wrapper = shallow(<CreateQuiz2/>);
        wrapper.instance().setState = jest.fn();
        wrapper.update();
        wrapper.find('SwitchSelector').simulate('press', true);
        expect(wrapper.instance().setState).toBeCalledWith({publish: true});

    });

    it('flatList', async () => {
        await retrieveItem();
        let wrapper = shallow(<CreateQuiz2/>);
        expect(wrapper.find('FlatList').length).toBe(1);
        const key = wrapper.find('FlatList').props().keyExtractor({id: 1});
        expect(key).toEqual('1')
    });

    describe('.renderItemIsSelected', () => {
        const mockItem = {
            title: 'Title',
        }
        let renderItemShallowWrapper;
        let wrapper = shallow(<CreateQuiz2/>);

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });

        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
    });
    it('get Params', async () => {
        await retrieveItem();
        const mockData = {
            title: 'Title',
            description: 'd',
            data: [],
            token: 't',
        }
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn((param) => mockData),
        };

        const wrapper = shallow(<CreateQuiz2 navigation={navigationMock} />);
        wrapper.update();
        expect(navigationMock.getParam).toHaveBeenCalled()
    });

});
