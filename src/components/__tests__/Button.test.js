import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/Button';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Button label='button' icon='send' />)
});

afterEach(() => {
  wrapped.unmount();
});

it('has a button', () => {
  expect(wrapped.find('button.btn')).toHaveLength(1);
});

it('has an icon', () => {
  expect(wrapped.find('button.btn>i.material-icons')).toHaveLength(1);
});

it('has a label', () => {
  expect(wrapped.find('button.btn').render().text()).toContain('button');
});