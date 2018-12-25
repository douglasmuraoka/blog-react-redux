import React from 'react';
import { mount } from 'enzyme';
import PostList from 'components/PostList';
import Root from 'components/Root';

it('should render a li for each post', () => {
  const initialState = {
    posts: [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ]
  };
  const wrapped = mount(<Root initialState={initialState}><PostList /></Root>);
  expect(wrapped.find('li').length).toEqual(2);
});