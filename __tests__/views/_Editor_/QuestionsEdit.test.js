import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuestionsEdit from "../../../app/views/Editor/question/QuestionsEdit";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";

describe('<QuestionsEdit />', () => {
    it('QuestionsEdit renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<QuestionsEdit />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuestionsEdit test against snapshot', async () => {
        await retrieveItem();
        const welcomePage = renderer.create(<QuestionsEdit />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('Button Create Question', async () => {
        await retrieveItem();
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<QuestionsEdit navigation={navigationMock} />);
        wrapper.find('.create-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['CreateQuestion']);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionsEdit/>);
        wrapper.setState({ loading: false });
        expect(wrapper.find('.list').length).toBe(1);
    });


    it('List', async () => {
        await retrieveItem();
        const navigationMock = { navigate: jest.fn() };
        let wrapper = shallow(<QuestionsEdit navigation={navigationMock} />);
        wrapper.setState({
            data: [
                {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "isMultiple": true,
                    "options": [
                        {
                            "title": "string",
                            "correct": true
                        }
                    ],
                    "isPublic": true,
                    "closed": true,
                    "approved": true,
                    "ownerId": 0,
                    "ownerUsername": "string"
                }
            ]
        });
        let item = {
            "id": 0,
            "title": "string",
            "description": "string",
            "isMultiple": true,
            "options": [
                {
                    "title": "string",
                    "correct": true
                }
            ],
            "isPublic": true,
            "closed": true,
            "approved": true,
            "ownerId": 0,
            "ownerUsername": "string"
        }
        wrapper.update();
        expect(wrapper.find('.list').length).toBe(1);
        const key = wrapper.find('FlatList').props().keyExtractor({id: 3});
        expect(key).toEqual('3')
    });

    describe('.renderItem', () => {
        const mockItem = {
            isPublic: false,
            lastWorkflow: {
                status: 'PUBLIC'
            }
        }
        const navigationMock = { navigate: jest.fn() };
        let renderItemShallowWrapper;
        let wrapper = shallow(<QuestionsEdit navigation={navigationMock}/>);

        beforeAll(() => {
            let RenderItem = wrapper.find('.list').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });

        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
        it('selectItem()', async () => {
            await retrieveItem();
            renderItemShallowWrapper.simulate('press');
            expect(navigationMock.navigate).toHaveBeenCalled()
        });
    });

    describe('componentWillReceiveProps()', () => {
        it('call commentChanged once', () => {
            const fakeCommentChanged =jest.spyOn(QuestionsEdit.prototype, 'componentWillReceiveProps');
            let defaultProps={reload:false}//define your props here
            const component = shallow(<QuestionsEdit props={defaultProps}/>);
            changedProps={reload:true}//define your nextProps here
            // triggers componentWillReceiveProps
            component.setProps(changedProps);
            //expectations
            expect(fakeCommentChanged).toHaveBeenCalled(); 
            //wrapper.find(MyComponent).setProps({ something })
           //write more expectations for other checks like when nextProps.value!=this.state.comment
        })
    })

});
