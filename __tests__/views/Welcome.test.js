import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Welcome from '../../app/views/Welcome';
import LogIn from "../../app/views/LogIn/LogIn";
import {retrieveItem} from "../../app/services/AsyncStorage/retrieve";

describe('<Welcome />', () => {
    it('Welcome renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<Welcome/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('Welcome test against snapshot', async () => {
        await retrieveItem();
        const welcomePage = renderer.create(<Welcome/>).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
    it('should navigate to Log In', async () => {
        await retrieveItem();
        const navigationMock = {
            navigate: jest.fn(),
            getParam: jest.fn()
        };
        const wrapper = shallow(<Welcome navigation={navigationMock}/>);
        wrapper.setState({loading: false});
        wrapper.find('.enter-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['LogIn']);
    })
});
