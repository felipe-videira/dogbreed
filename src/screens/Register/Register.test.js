import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import RegisterForm from './components/RegisterForm';


const defaultProps = {
  handleSubmit: jest.fn(),
  emailLabel: 'mock text',
  submitTitle: 'mock text',
  requiredEmailText: 'mock text',
  invalidEmailText: 'mock text',
},
Register = props => (
  <RegisterForm
    {...defaultProps}
    {...props}
  />
);

describe('Register Screen', () => {

  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Register />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom initial values correctly', () => {
    const props = {
      values: { email: 'mock@mock.com' }
    }
    const wrapper = mount(<Register {...props} />);
    expect(wrapper.prop('values')).toEqual(props.values);
  });

  it('should show the correct message for invalid email', () => {
    const props = {
      invalidEmailText: 'mock invalidEmailText',
      values: { email: 'invalid.email.com' }
    };

    const wrapper = mount(<Register {...props} />);

    act(() => {
      wrapper.find('Button').first().props().onPress();
    })

    wrapper.update();

    expect(wrapper.find('Input').first().prop('errorMessage'))
      .toBe(props.invalidEmailText);
  })

});

