import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SettingsReviewer from "../../../app/views/Reviewer/SettingsReviewer";
import SettingsPlayer from "../../../app/views/Player/SettingsPlayer";

describe('<SettingsReviewer />', () => {
    it('SettingsReviewer renders without crashing', () => {
        const rendered = renderer.create(<SettingsReviewer />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('SettingsReviewer test against snapshot', () => {
        const page = renderer.create(<SettingsReviewer />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('should navigate to Player', () => {
        const navigationMock = { dispatch: jest.fn() };
        const wrapper = shallow(<SettingsReviewer navigation={navigationMock} />);
        wrapper.find('.player-button').simulate('press');
        expect(navigationMock.dispatch.mock.calls.length).toEqual(1);
    })
    it('signOff', () => {
        let wrapper = shallow(<SettingsReviewer/>);
        wrapper.instance().signOff = jest.fn();
        wrapper.update();
        wrapper.find('.signoff-button').simulate('press');
        expect(wrapper.instance().signOff).toBeCalledTimes(1);
    })
});
