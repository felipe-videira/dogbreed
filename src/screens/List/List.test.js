import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

import ListItem from './components/ListItem';
import ImageList from './components/ImageList';

import { BREEDS } from '../../constants';


const defaultItemProps = {
  item: 'mock item',
  onPress: jest.fn(),
}
Item = props => (
  <ListItem
    {...defaultItemProps}
    {...props}
  />
);

const defaultListProps = {
  emptyListText: 'mock text',
  onLogout: jest.fn(),
  onValueChange: jest.fn(),
  onItemPress: jest.fn(),
}
List = props => (
  <ImageList
    {...defaultListProps}
    {...props}
  />
);

describe('List Screen', () => {

  it('Item should match the snapshot', () => {
    expect(renderer.create(<Item />).toJSON())
      .toMatchSnapshot();
  });

  it('Item should pass the correct props for Image', () => {
    const wrapper = shallow(<Item />);
    const imageUri = wrapper.dive().dive()
      .find('Image')
      .first()
      .prop("uri");

    expect(imageUri).toEqual(defaultItemProps.item);
  });

  it('Item should call onPress prop', () => {
    const wrapper = shallow(<Item />);

    wrapper.dive().dive()
      .find('TouchableOpacity')
      .first()
      .props()
      .onPress();

    expect(defaultItemProps.onPress)
      .toHaveBeenCalledWith(defaultItemProps.item);
  });

  it('List should match the snapshot', () => {
    expect(renderer.create(<List />).toJSON())
      .toMatchSnapshot();
  });

  it('List should pass the correct props for FlastList', () => {
    const props = {
      data: ['mock']
    };
    const wrapper = shallow(<List {...props}/>);
    const flatListData = wrapper.dive()
      .find('FlatList')
      .first()
      .prop("data");

    expect(flatListData).toEqual(props.data);
  });

  it('List should pass the correct props for RNPickerSelect', () => {
    const props = {
      value: BREEDS.HUSKY,
    };
    const wrapper = shallow(<List {...props}/>);
    const pickerSelect = wrapper.dive()
      .find('RNPickerSelect')
      .first();

    expect(pickerSelect.prop("value"))
      .toEqual(props.value);
    expect(pickerSelect.prop("onValueChange"))
      .toEqual(defaultListProps.onValueChange);
  });

  it('List should pass the correct props for Header', () => {
    const wrapper = shallow(<List />);
    const headerOnLogout = wrapper.dive()
      .find('Header')
      .first()
      .prop("onLogout");

    expect(headerOnLogout)
      .toEqual(defaultListProps.onLogout);
  });

  it('List should pass the correct props for ListItem', () => {
    const wrapper = shallow(<List />);
    const RenderItem = wrapper.dive()
      .find('FlatList')
      .first()
      .prop('renderItem');
    const renderItemOnPress = shallow(<RenderItem />)
      .prop('onPress');

    expect(renderItemOnPress)
      .toEqual(defaultListProps.onItemPress);
  });

  it('List should render the loader', () => {
    const props = {
      loading: true
    };
    const wrapper = shallow(<List {...props}/>);
    const flatList = wrapper.dive().find('FlatList');
    const activityIndicator = wrapper.dive().find('ActivityIndicator');

    expect(flatList.length).toBe(0);
    expect(activityIndicator.length).toBe(1);
  });

  it('List should render the correct empty list text', () => {
    const wrapper = shallow(<List />);
    const ListEmptyComponent = wrapper.dive()
      .find('FlatList')
      .first()
      .prop("ListEmptyComponent");

    const listEmptyComponentChildren = shallow(<ListEmptyComponent />)
      .prop('children');

    expect(listEmptyComponentChildren)
      .toBe(defaultListProps.emptyListText);
  });

});


