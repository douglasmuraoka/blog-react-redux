import React from 'react';
import { shallow } from 'enzyme';
import CommentForm from 'components/CommentForm';

let wrapped;
let onSubmit;

beforeEach(() => {
  onSubmit = jest.fn();
  wrapped = shallow(<CommentForm postId='1' onSubmit={onSubmit} />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a form', () => {
  expect(wrapped.find('form')).toHaveLength(1);
});

it('has a body field', () => {
  expect(wrapped.find('CommentFormField[name="body"]')).toHaveLength(1);
});

it('has a button', () => {
  expect(wrapped.find('form>Button[type="submit"]')).toHaveLength(1);
});

it('has a name field', () => {
  expect(wrapped.find('CommentFormField[name="name"]')).toHaveLength(1);
});

it('has an email field', () => {
  expect(wrapped.find('CommentFormField[name="email"][type="email"]')).toHaveLength(1);
});

it('submits postId, name, email and body', () => {
  wrapped.find('CommentFormField[name="body"]').simulate('change', {
    target: {
      value: 'Comment content',
      classList: { replace: jest.fn() },
      setCustomValidity: jest.fn()
    }
  });
  wrapped.find('CommentFormField[name="name"]').simulate('change', { target: { value: 'Name' } });
  wrapped.find('CommentFormField[name="email"][type="email"]').simulate('change', { target: { value: 'foo@bar.com' } });
  wrapped.update();
  const preventDefault = jest.fn();
  wrapped.find('form').simulate('submit', { preventDefault });
  expect(onSubmit).toHaveBeenCalledWith({
    postId: '1',
    body: 'Comment content',
    name: 'Name',
    email: 'foo@bar.com'
  });
  expect(preventDefault).toHaveBeenCalled();
});