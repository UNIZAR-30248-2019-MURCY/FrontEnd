import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import QuizzesEdit from "../../../app/views/Editor/QuizzesEdit";
import {retrieveItem} from "../../../app/modules/AsyncStorage/retrieve";
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native'


describe('<QuizzesEdit/>', () => {
    it('QuizzesScreen renders without crashing', async () => {
        await retrieveItem();
        const rendered = renderer.create(<QuizzesEdit/>).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('QuizzesScreen test against snapshot', async () => {
        await retrieveItem();
        const page = renderer.create(<QuizzesEdit />).toJSON();
        expect(page).toMatchSnapshot();
    });
    it('Button Create Quiz', async () => {
        await retrieveItem();
        const navigationMock = { navigate: jest.fn() };
        const wrapper = shallow(<QuizzesEdit navigation={navigationMock} />);
        wrapper.find('.create-button').simulate('press');
        expect(navigationMock.navigate.mock.calls.length).toEqual(1);
        expect(navigationMock.navigate.mock.calls[0]).toEqual(['CreateQuiz']);
    });
    it('should render the List if state.notShow is false', async () => {
        await retrieveItem();
        let wrapper = shallow(<QuizzesEdit/>);
        wrapper.setState({ loading: false });
        expect(wrapper.find('.list').length).toBe(1);
    });
    it('Button Create Question',  () => {
        //await retrieveItem();

            const navigationMock = { navigate: jest.fn() };
            let wrapper = shallow(<QuizzesEdit navigation={navigationMock} />);
            wrapper.setState({
                data: [
                    {
                      "id": 0,
                      "title": "string",
                      "description": "string",
                      "isPublic": true,
                      "closed": true,
                      "approved": true,
                      "workflow": {
                        "id": 0,
                        "title": "string",
                        "description": "string",
                        "status": "APPROVED",
                        "statusDate": "2019-12-29T08:02:28.346Z",
                        "statusBy": "string",
                        "response": "string"
                      },
                      "lastWorkflow": {
                        "id": 0,
                        "title": "string",
                        "description": "string",
                        "status": "APPROVED",
                        "statusDate": "2019-12-29T08:02:28.346Z",
                        "statusBy": "string",
                        "response": "string"
                      },
                      "questions": [
                        {
                          "id": 0,
                          "title": "string",
                          "description": "string",
                          "isMultiple": true,
                          "options": [
                            {
                              "title": "string",
                              "correct": true
                            }
                          ]
                        }
                      ],
                      "ownerId": 0,
                      "ownerUsername": "string"
                    }
                  ],
            });
    
            let item = {
                "id": 0,
                "title": "string",
                "description": "string",
                "isPublic": true,
                "closed": true,
                "approved": true,
                "workflow": {
                  "id": 0,
                  "title": "string",
                  "description": "string",
                  "status": "APPROVED",
                  "statusDate": "2019-12-29T08:02:28.346Z",
                  "statusBy": "string",
                  "response": "string"
                },
                "lastWorkflow": {
                  "id": 0,
                  "title": "string",
                  "description": "string",
                  "status": "APPROVED",
                  "statusDate": "2019-12-29T08:02:28.346Z",
                  "statusBy": "string",
                  "response": "string"
                },
                "questions": [
                  {
                    "id": 0,
                    "title": "string",
                    "description": "string",
                    "isMultiple": true,
                    "options": [
                      {
                        "title": "string",
                        "correct": true
                      }
                    ]
                  }
                ],
                "ownerId": 0,
                "ownerUsername": "string"
            }

            expect(wrapper.find('.list').length).toBe(1);
            const key = wrapper.find('FlatList').props().keyExtractor({id: 3});
            expect(key).toEqual('3')
            wrapper.update();
            //expect(wrapper.find('item-button').length).toBe(1);
            //wrapper.update().find('item-button').simulate('press');
            //expect(navigationMock.navigate.mock.calls[0]).toEqual(['EditRemoveQuestion', {info: item} ]);
    });
});
