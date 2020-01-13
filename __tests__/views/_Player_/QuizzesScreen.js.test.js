import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizzesScreen from "../../../app/views/Player/QuizzesScreen";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import Request from "../../../app/views/Player/Request";
import LogIn from "../../../app/views/LogIn/LogIn";

describe('<QuizzesScreen/>', () => {
    it('QuizzesScreen renders without crashing', () => {
        const rendered = renderer.create(<QuizzesScreen/>).toJSON();
        expect(rendered).toBeTruthy();
    });
});
