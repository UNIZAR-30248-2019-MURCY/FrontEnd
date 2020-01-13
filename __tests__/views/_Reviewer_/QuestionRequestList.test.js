import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import QuestionRequestList from "../../../app/views/Reviewer/QuestionReqList";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";
import LogIn from "../../../app/views/LogIn/LogIn";
import RequestList from "../../../app/views/Reviewer/RequestList";

describe('<QuestionRequestList />', () => {
    it('QuestionRequestList renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<QuestionRequestList/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuestionRequestList test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<QuestionRequestList/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should render the errorGettingReq if state.errorGettingReq is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.setState({errorGettingReq: 'Error'});
        expect(wrapper.find('.errorGettingReq').length).toBe(1);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.setState({ errorGettingReq: false });
        wrapper.setState({ loading: false });
        expect(wrapper.find('.reqList').length).toBe(1);
    });
    it('filter-button', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.instance().reload = jest.fn();
        wrapper.update();
        wrapper.find('.accepted-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(1);
        wrapper.find('.denied-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(2);
        wrapper.find('.opened-button').simulate('press');
        expect(wrapper.instance().reload).toBeCalledTimes(3);

    });

    it('list', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuestionRequestList/>);
        wrapper.setState({
            loading: false,
            requests: [
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
                  "workflow": {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "status": "APPROVED",
                    "statusDate": "2020-01-12T09:58:37.675Z",
                    "statusBy": "string",
                    "response": "string"
                  },
                  "lastWorkflow": {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "status": "APPROVED",
                    "statusDate": "2020-01-12T09:58:37.675Z",
                    "statusBy": "string",
                    "response": "string"
                  },
                  "ownerId": 0,
                  "ownerUsername": "string"
                }
              ]
         })

        wrapper.update();
        expect(wrapper.find('.flatList').length).toBe(1);
        const key = wrapper.find('FlatList').props().keyExtractor({id: 3});
        expect(key).toEqual('3')
    });
    describe('.renderItemIsSelected', () => {
        const mockItem = {
            workflow: 'w',
            item: 'i',
            workflowList:[],
            ownerUserName:'',
            question:'',
            closed:''
        }
        let renderItemShallowWrapper;
        const navigationMock = { navigate: jest.fn() };
        let wrapper = shallow(<QuestionRequestList navigation={navigationMock}/>);
        wrapper.setState({
            loading: false
        })
        wrapper.instance().selectItem = jest.fn();
        wrapper.update();

        beforeAll(() => {
            let RenderItem = wrapper.find('.flatList').prop('renderItem');
            renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
        });

        it('should match the snapshot', () => {
            expect(renderItemShallowWrapper).toMatchSnapshot();
        });
        it('navigate()', async () => {
            await retrieveItem();
            renderItemShallowWrapper.simulate('press');
            expect(navigationMock.navigate).toHaveBeenCalled()
        });
    });

});
