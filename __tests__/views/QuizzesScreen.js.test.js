import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizzesScreen from "../../app/views/Player/QuizzesScreen";

describe('<QuizzesScreen/>', () => {
    it('QuizzesScreen renders without crashing', () => {
        const rendered = renderer.create(<QuizzesScreen/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuizzesScreen test against snapshot', () => {
        const welcomePage = renderer.create(<QuizzesScreen />).toJSON();
        expect(welcomePage).toMatchSnapshot();
    });
});
