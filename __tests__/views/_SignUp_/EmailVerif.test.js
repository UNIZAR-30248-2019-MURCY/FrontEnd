import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EmailVerif from "../../../app/views/SignUp/EmailVerif";

describe('<EmailVerif />', () => {
    it('EmailVerif renders without crashing', () => {
        const rendered = renderer.create(<EmailVerif />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('EmailVerif test against snapshot', () => {
        const page = renderer.create(<EmailVerif />).toJSON();
        expect(page).toMatchSnapshot();
    });
});
