import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditRemoveQuiz from "../../../app/views/Editor/quiz/EditRemoveQuiz";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";
import CreateQuiz from "../../../app/views/Editor/quiz/CreateQuiz";

describe('<EditRemoveQuiz />', () => {
    it('CreateQuiz renders without crashing', () => {
        const rendered = renderer.create(<EditRemoveQuiz/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuiz test against snapshot', () => {
        const welcomePage = renderer.create(<EditRemoveQuiz/>).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('handleSubmit: Edit Quiz', () => {
        let wrapper = shallow(<EditRemoveQuiz/>);
        wrapper.instance().handleSubmit = jest.fn();
        wrapper.update();
        wrapper.find('.create-button').simulate('press');
        expect(wrapper.instance().handleSubmit).toBeCalledTimes(1);
    });
    it('handleSubmit: Delete Quiz', () => {
        let wrapper = shallow(<EditRemoveQuiz/>);
        wrapper.instance().deleteQuiz = jest.fn();
        wrapper.update();
        wrapper.find('.delete-button').simulate('press');
        expect(wrapper.instance().deleteQuiz).toBeCalledTimes(1);
    });
    it('goBack and navigate to QuizzesEdit', () => {
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<EditRemoveQuiz navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack).toHaveBeenCalled()
    });
    it('should render the Error component if state.error is true', () => {
        let createComponent = shallow(<EditRemoveQuiz/>);
        createComponent.setState({error: true});
        expect(createComponent.find('.errorShow').length).toBe(1);
        createComponent.setState({error: false});
        expect(createComponent.find('.errorShow').length).toBe(0);
    });
    it('should render the Loading component if state.loading is true', () => {
        let createComponent = shallow(<EditRemoveQuiz/>);
        createComponent.setState({loading: true});
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('onChangeText', () => {
        let wrapper = shallow(<EditRemoveQuiz/>);
        wrapper.instance().onChangeText = jest.fn();

        let event = 'Quiz2';
        wrapper.find('.questionInput').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('title', 'Quiz2');

        event = 'Description';
        wrapper.find('.description').simulate('changeText', event)
        expect(wrapper.instance().onChangeText).toBeCalledWith('description', 'Description');

    });

    describe('.renderItemIsSelected', () => {
        const mockItem = {
            title: 'Title',
            isSelect: false,
        }
        let renderItemShallowWrapper;
        let wrapper = shallow(<EditRemoveQuiz/>);

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });
        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
    });

    describe('.selectItem()', () => {
        const mockItem = {
            title: 'Title',
            isSelect: true,
        }
        let renderItemShallowWrapper;
        let wrapper = shallow(<EditRemoveQuiz/>);
        wrapper.instance().selectItem = jest.fn();
        wrapper.update();

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });

        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
        it('selectItem()', async () => {
            await retrieveItem();
            renderItemShallowWrapper.find('.question').simulate('press');

            expect(wrapper.instance().selectItem).toBeCalledTimes(1);
        });
    });

    describe('.selectItem execute', () => {
        const mockItem = {
            title: 'Title',
            isSelect: true,
        }
        let renderItemShallowWrapper;
        let wrapper = shallow(<EditRemoveQuiz/>);

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });

        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
        it('selectItem()', async () => {
            await retrieveItem();
            const selectItem = jest.spyOn(wrapper.instance(), 'selectItem');
            wrapper.update();
            renderItemShallowWrapper.update();
            renderItemShallowWrapper.find('.question').simulate('press',mockItem );
            expect(selectItem).toBeCalled();
        });
    });

});


