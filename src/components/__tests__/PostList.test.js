import React from 'react';
import { mount } from 'enzyme';
import PostList from 'components/PostList';
import Root from 'components/Root';

it('should render a li for each post', () => {
  const initialState = {
    posts: ['Post #1', 'Post #2']
  };
  const wrapped = mount(<Root initialState={initialState}><PostList /></Root>);
  expect(wrapped.find('li').length).toEqual(2);
});