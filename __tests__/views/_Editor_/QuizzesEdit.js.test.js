import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizzesEdit from "../../../app/views/Editor/QuizzesEdit";

describe('<QuizzesEdit/>', () => {
    it('QuizzesScreen renders without crashing', () => {
        const rendered = renderer.create(<QuizzesEdit/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuizzesScreen test against snapshot', () => {
        const page = renderer.create(<QuizzesEdit />).toJSON();
        expect(page).toMatchSnapshot();
    });
});
