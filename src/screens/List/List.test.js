import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

import ImageList from './components/ImageList';
import { BREEDS } from '../../constants';


const defaultProps = {
  onLogout: jest.fn(),
  onValueChange: jest.fn(),
  onItemPress: jest.fn(),
}
List = props => (
  <ImageList
    {...defaultProps}
    {...props}
  />
);

describe('List Screen', () => {

  it('should match the snapshot', () => {
    expect( renderer.create(<List />).toJSON()).toMatchSnapshot();
  });

  it('should pass the correct data for FlastList', () => {
    const props = {
      data: ['mock']
    };

    const wrapper = shallow(<List {...props}/>);

    const flatList = wrapper.dive().find('FlatList').first();

    expect(flatList.prop("data")).toEqual(props.data);
  });

  it('should pass the correct value for RNPickerSelect', () => {
    const props = {
      value: BREEDS.HUSKY
    };

    const wrapper = shallow(<List {...props}/>);

    const pickerSelect = wrapper.dive().find('RNPickerSelect').first();

    expect(pickerSelect.prop("value")).toEqual(props.value);
  });

  it('should show loader on loading equals true', () => {
    const props = {
      loading: true
    };

    const wrapper = shallow(<List {...props}/>);

    const flatList = wrapper.dive().find('FlatList');
    const activityIndicator = wrapper.dive().find('ActivityIndicator');

    expect(flatList.length).toBe(0);
    expect(activityIndicator.length).toBe(1);
  });

});


