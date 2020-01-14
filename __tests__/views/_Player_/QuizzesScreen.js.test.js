import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizzesScreen from "../../../app/views/Player/QuizzesScreen";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";


describe('<QuizzesScreen/>', () => {
    it('QuizzesScreen renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<QuizzesScreen/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('CreateQuiz test against snapshot', async () => {
        await retrieveItem();
        const quizzesScreen = renderer.create(<QuizzesScreen />).toJSON();
        expect(quizzesScreen).toMatchSnapshot();
    });
    it('should render the Loading component if state.loading is true', async () => {
        await retrieveItem();

        let createComponent = shallow(<QuizzesScreen />);
        createComponent.setState({ loading: true });
        expect(createComponent.find('.loadingShow').length).toBe(1);
    });
    it('should not render the Loading component if state.loading is false', async () => {
        await retrieveItem();

        let createComponent = shallow(<QuizzesScreen />);
        createComponent.setState({ loading: false });
        expect(createComponent.find('.loadingShow').length).toBe(0);
    });
});

describe('.renderItem', () => {
    const mockItem = {
        title: 'Title',
    }
    let renderItemShallowWrapper;
    let wrapper = shallow(<QuizzesScreen/>);

    beforeAll(() => {
        let RenderItem = wrapper.find('.carousel').prop('renderItem');
        renderItemShallowWrapper = shallow(<RenderItem item={mockItem} />);
    });

    it('should match the snapshot', () => {
        expect(renderItemShallowWrapper).toMatchSnapshot();
    });
});
