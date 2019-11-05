import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SettingsPlayer from "../../../app/views/Player/SettingsPlayer";
import LogIn from "../../../app/views/LogIn/LogIn";
import {retrieveItem} from "../../../app/services/AsyncStorage/retrieve";

describe('<SettingsPlayer />', () => {
    it('SettingsPlayer renders without crashing', async() => {
        await retrieveItem();
        const rendered = renderer.create(<SettingsPlayer />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SettingsPlayer test against snapshot', async() => {
        await retrieveItem();
        const page = renderer.create(<SettingsPlayer />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Request', async() => {
        await retrieveItem();
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<SettingsPlayer navigation={navigationMock} />);
        wrapper.find('.request-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate
            .mock.calls[0]).toEqual(['Request']);
    })
    it('should navigate to Editor', async() => {
        await retrieveItem();
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsPlayer navigation={navigationMock} />);
        wrapper.setState({ editor: true });
        wrapper.find('.editor-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('should navigate to Reviewer', async() => {
        await retrieveItem();
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsPlayer navigation={navigationMock} />);
        wrapper.setState({ reviewer: true });
        wrapper.find('.reviewer-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('signOff', async() => {
        await retrieveItem();
        let wrapper = shallow(<SettingsPlayer/>);
        wrapper.instance().signOff = jest.fn();
        wrapper.update();
        wrapper.find('.signoff-button').simulate('press');
        expect(wrapper.instance().signOff).toBeCalledTimes(1);
    })
});
