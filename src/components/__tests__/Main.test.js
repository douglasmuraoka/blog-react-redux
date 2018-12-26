import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Main from 'components/Main';
import App from 'components/App';
import NotFound from 'components/NotFound';
import PostDetail from 'components/PostDetail';
import Root from 'components/Root';

/**
 * Mounts the Main component wrapped in a MemoryRouter,
 * allowing us to provide the path to be tested.
 * 
 * @param {!String} path The router path
 */
const getWrappedMain = path => mount(
  <Root><MemoryRouter initialEntries={ [path] }><Main /></MemoryRouter></Root>
);

let wrapped;

afterEach(() => {
  wrapped.unmount();
})

it('should render the App component on path "/"', () => {
  wrapped = getWrappedMain('/');
  expect(wrapped.find(App)).toHaveLength(1);
})

it('should render the App component on path "/posts"', () => {
  wrapped = getWrappedMain('/posts');
  expect(wrapped.find(App)).toHaveLength(1);
})

it('should render the PostDetail component on path "/posts/:id"', () => {
  wrapped = getWrappedMain('/posts/1');
  expect(wrapped.find(PostDetail)).toHaveLength(1);
})

it('should render the NotFound component on unknown path', () => {
  wrapped = getWrappedMain('/foobar')
  expect(wrapped.find(NotFound)).toHaveLength(1);
})