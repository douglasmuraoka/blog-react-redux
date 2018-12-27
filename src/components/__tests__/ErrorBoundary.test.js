import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundary from 'components/ErrorBoundary';
import PostList from 'components/PostList';
import PostDetail from 'components/PostDetail';
import Root from 'components/Root';

let wrapped;

it('should handle postlist errors', () => {
  const initialState = {
    posts: {
      error: new Error('foo')
    }
  };
  wrapped = mount(<ErrorBoundary><Root initialState={initialState}><PostList /></Root></ErrorBoundary>);
  expect(wrapped.render().text()).toContain('Oops! Something went wrong');
});

it('should handle postdetail errors', () => {
  const initialState = {
    posts: {
      error: new Error('bar')
    }
  };
  wrapped = mount(<ErrorBoundary><Root initialState={initialState}><PostDetail match={{ params: { id: 1 }}} /></Root></ErrorBoundary>);
  expect(wrapped.render().text()).toContain('Oops! Something went wrong');
});