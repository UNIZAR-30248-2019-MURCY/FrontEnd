import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import WorkflowQuestionView from "../../../FrontEnd/app/components/WorkflowQuestionView";


describe('<WorkflowQuestionView />', () => {
    it('WorkflowView renders without crashing', () => {
        const rendered = renderer.create(<WorkflowQuestionView/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('WorkflowView test against snapshot', () => {
        const page = renderer.create(<WorkflowQuestionView/>).toJSON();
        expect(page).toMatchSnapshot();
    });
});
