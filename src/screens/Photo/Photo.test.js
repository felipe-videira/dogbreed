import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import { View as MockComponent } from 'react-native';

import PhotoDisplay from './components/PhotoDisplay';

jest.mock('@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView',
  () => props => (
    <MockComponent style={props.style}>
      {props.children}
    </MockComponent>
  ));


const defaultProps = {
  uri: 'mock uri',
  onGoBack: jest.fn(),
  imageSize: { width: 0, height: 0 }
},
Photo = props => (
  <PhotoDisplay
    {...defaultProps}
    {...props}
  />
);

describe('Photo Screen', () => {

  it('should match the snapshot', () => {
    expect(renderer.create(<Photo />).toJSON()).toMatchSnapshot();
  });

  it('should pass the correct props for Image', () => {
    const wrapper = shallow(<Photo />);
    const image = wrapper.dive().find('Image').first();

    expect(image.prop('uri')).toEqual(defaultProps.uri);
    expect(image.prop('style')).toEqual(defaultProps.imageSize);
  });

  it('should pass the correct props for Header', () => {
    const wrapper = shallow(<Photo />);
    const headerOnGoBack = wrapper.dive()
      .find('Header')
      .first()
      .prop("onGoBack");

    expect(headerOnGoBack).toEqual(defaultProps.onGoBack);
  });

});


