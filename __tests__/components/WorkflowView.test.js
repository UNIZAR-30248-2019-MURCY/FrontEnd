import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import WorkflowView from "../../../FrontEnd/app/components/WorkflowView";


describe('<WorkflowView />', () => {
    it('WorkflowView renders without crashing', () => {
        const rendered = renderer.create(<WorkflowView/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('WorkflowView test against snapshot', () => {
        const page = renderer.create(<WorkflowView/>).toJSON();
        expect(page).toMatchSnapshot();
    });
});
