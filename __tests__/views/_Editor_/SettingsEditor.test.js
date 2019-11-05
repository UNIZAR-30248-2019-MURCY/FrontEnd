import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SettingsEditor from "../../../app/views/Editor/SettingsEditor";
import SettingsReviewer from "../../../app/views/Reviewer/SettingsReviewer";

describe('<SettingsEditor />', () => {
    it('SettingsEditor renders without crashing', () => {
        const rendered = renderer.create(<SettingsEditor />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SettingsEditor test against snapshot', () => {
        const page = renderer.create(<SettingsEditor />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Player', () => {
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsEditor navigation={navigationMock} />);
        wrapper.find('.player-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('signOff', () => {
        let wrapper = shallow(<SettingsEditor/>);
        wrapper.instance().signOff = jest.fn();
        wrapper.update();
        wrapper.find('.signoff-button').simulate('press');
        expect(wrapper.instance().signOff).toBeCalledTimes(1);
    })
});
