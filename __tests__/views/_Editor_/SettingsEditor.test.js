import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SettingsEditor from "../../../app/views/Editor/SettingsEditor";
import SettingsReviewer from "../../../app/views/Reviewer/SettingsReviewer";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import SettingsPlayer from "../../../app/views/Player/SettingsPlayer";

describe('<SettingsEditor />', () => {
    it('SettingsEditor renders without crashing', async() => {
        await retrieveItem();
        const rendered = renderer.create(<SettingsEditor />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SettingsEditor test against snapshot', async() => {
        await retrieveItem();
        const page = renderer.create(<SettingsEditor />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Player', async() => {
        await retrieveItem();
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsEditor navigation={navigationMock} />);
        wrapper.setState({ player: true });
        wrapper.find('.player-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('should navigate to Reviewer', async() => {
        await retrieveItem();
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsEditor navigation={navigationMock} />);
        wrapper.setState({ reviewer: true });
        wrapper.find('.reviewer-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('signOff', async() => {
        await retrieveItem();
        let wrapper = shallow(<SettingsEditor/>);
        wrapper.instance().signOff = jest.fn();
        wrapper.update();
        wrapper.find('.signoff-button').simulate('press');
        expect(wrapper.instance().signOff).toBeCalledTimes(1);
    })
});
