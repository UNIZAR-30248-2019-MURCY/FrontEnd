import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizPlayScreen from "../../../app/views/Player/QuizPlayScreen";

describe('<QuizPlayScreen/>', () => {
    it('QuizPlayScreen renders without crashing', () => {
        const rendered = renderer.create(<QuizPlayScreen/>).toJSON();
        expect(rendered).toBeTruthy();
    });
});
