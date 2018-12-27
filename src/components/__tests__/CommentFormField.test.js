import React from 'react';
import { shallow } from 'enzyme';
import CommentFormField from 'components/CommentFormField';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<CommentFormField id='field' name='name' label='label' />)
});

afterEach(() => {
  wrapped.unmount();
});

it('has a label', () => {
  expect(wrapped.find('label')).toHaveLength(1);
});

it('has an input', () => {
  expect(wrapped.find('input')).toHaveLength(1);
});

it('labels correctly', () => {
  expect(wrapped.find('label').prop('htmlFor')).toEqual(wrapped.find('input').prop('id'));
});

it('has the input-field class', () => {
  expect(wrapped.find('.input-field')).toHaveLength(1);
});

it('has an textarea', () => {
  wrapped.unmount();

  wrapped = shallow(<CommentFormField id='field' name='name' label='label' type='textarea' />);
  expect(wrapped.find('textarea')).toHaveLength(1);
});