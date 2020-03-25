import React from 'react';
import { mount } from 'enzyme';

import RegisterForm from './components/RegisterForm';
import { Input } from 'react-native-elements';

describe('<RegisterForm />', () => {
  const component = mount(<RegisterForm />);

  it('should match the snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should have an email field', () => {
    const field = component.find(Input);
    expect(field.length).toBe(1);
    expect(field.prop("keyboardType")).toBe("email-address");
  });

});
