/*
Tests on this component are limited (for the time being) because of
limitations of test libraries with asynchronous tasks, such as Formik actions
to handle form update and validation. A solution to this problem is being evaluated.

The tested libraries include 'enzyme', 'react-test-renderer' and '@testing-library/react-native'.
*/


import React from 'react';
import renderer from 'react-test-renderer';

import RegisterForm from './components/RegisterForm';


const defaultProps = {
  onSubmit: jest.fn(),
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
    expect(renderer.create(<Register />).toJSON()).toMatchSnapshot();
  });

});


