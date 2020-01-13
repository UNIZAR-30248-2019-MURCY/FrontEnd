import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import EditRemoveQuiz2 from "../../../app/views/Editor/quiz/EditRemoveQuiz2";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";
import EditRemoveQuiz from "../../../app/views/Editor/quiz/EditRemoveQuiz";
import CreateQuiz2 from "../../../app/views/Editor/quiz/CreateQuiz2";

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
    describe('.renderItemIsSelected', () => {
        const mockItem = {
            title: 'Title',
        }
        let renderItemShallowWrapper;
        let wrapper = shallow(<EditRemoveQuiz2/>);

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });
        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
    });
    it('get Params Draft', async () => {
        await retrieveItem();
        const mockData = {
            title: 'Title',
            description: 'd',
            data: [],
            token: 't',
            lastWorkflow: {
                status: 'DRAFT'
            }
        }
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn((param) => mockData),
        };

        const wrapper = shallow(<EditRemoveQuiz2 navigation={navigationMock} />);
        wrapper.update();
        expect(navigationMock.getParam).toHaveBeenCalled()
    });
    it('get Params Public', async () => {
        await retrieveItem();
        const mockData = {
            title: 'Title',
            description: 'd',
            data: [],
            token: 't',
            lastWorkflow: {
                status: 'PUBLIC'
            }
        }
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn((param) => mockData),
        };

        const wrapper = shallow(<EditRemoveQuiz2 navigation={navigationMock} />);
        wrapper.update();
        expect(navigationMock.getParam).toHaveBeenCalled()
    });


});


