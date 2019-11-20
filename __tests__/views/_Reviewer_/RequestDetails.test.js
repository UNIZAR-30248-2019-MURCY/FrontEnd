import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";
import {retrieveItem} from "../../../app/services/AsyncStorage/retrieve";

describe('<RequestDetails />', () => {
    it('RequestDetails renders without crashing', () => {
        const page = renderer.create(<RequestDetails/>).toJSON();
        expect(page).toBeTruthy();
    });
    it('RequestDetails test against snapshot', () => {
        const page = renderer.create(<RequestDetails/>).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should go back', async () => {
        await retrieveItem();
        const navigationMock = {
            goBack: jest.fn(),
            getParam: jest.fn(),
        };
        const wrapper = shallow(<RequestDetails navigation={navigationMock}/>);
        wrapper.find('.return-button').simulate('press');
        expect(navigationMock.goBack.mock.calls.length).toEqual(1);
    });
});
