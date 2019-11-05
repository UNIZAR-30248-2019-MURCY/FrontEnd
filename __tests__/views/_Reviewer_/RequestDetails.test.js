import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RequestDetails from "../../../app/views/Reviewer/RequestDetails";
import {retrieveItem} from "../../../app/services/AsyncStorage/retrieve";

describe('<RequestDetails />', () => {
    it('RequestDetails renders without crashing', () => {
        const page = renderer.create(<RequestDetails />).toJSON();
        expect(page).toBeTruthy();
    });
    it('RequestDetails test against snapshot', () => {
        const page = renderer.create(<RequestDetails />).toJSON();
        expect(page).toMatchSnapshot();
    });
});
