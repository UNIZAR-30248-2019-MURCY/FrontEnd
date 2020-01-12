import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import RequestList from "../../../app/views/Reviewer/RequestList";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<RequestList />', () => {
    it('RequestList renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<RequestList/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('RequestList test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<RequestList/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should render the errorGettingReq if state.errorGettingReq is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
        wrapper.setState({errorGettingReq: 'Error'});
        expect(wrapper.find('.errorGettingReq').length).toBe(1);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
        wrapper.setState({ errorGettingReq: false });
        wrapper.setState({ loading: false });
        expect(wrapper.find('.reqList').length).toBe(1);
    });
    it('should render the List if state.notShow is true', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
        wrapper.setState({ loading: true });
        expect(wrapper.find('.reqList').length).toBe(0);
    });
    it('filter-button', async () => {
        await retrieveItem();
        let wrapper = shallow(<RequestList/>);
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
        const navigationMock = {
            navigate: jest.fn()
        };
        let wrapper = shallow(<RequestList navigation={navigationMock}/>);
        wrapper.setState({
            loading: false,
            requests: [
                {
                  "id": 0,
                  "description": "string",
                  "closed": true,
                  "approved": true,
                  "workflow": {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "status": "APPROVED",
                    "statusDate": "2020-01-12T09:58:58.743Z",
                    "statusBy": "string",
                    "response": "string"
                  },
                  "lastWorkflow": {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "status": "APPROVED",
                    "statusDate": "2020-01-12T09:58:58.743Z",
                    "statusBy": "string",
                    "response": "string"
                  }
                }
              ]              
         })

        wrapper.update();
        expect(wrapper.find('.flatList').length).toBe(1);
        const key = wrapper.find('FlatList').props().keyExtractor({id: 3});
        expect(key).toEqual('3')
        

        //wrapper.find('.flatList').simulate('press');
        //expect(navigationMock.navigate.mock.calls[0]).toEqual(['RequestDetails']);
    });

});
