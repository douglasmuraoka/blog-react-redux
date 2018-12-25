import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Main from 'components/Main';
import App from 'components/App';
import NotFound from 'components/NotFound';

/**
 * Mounts the Main component wrapped in a MemoryRouter,
 * allowing us to provide the path to be tested.
 * 
 * @param {!String} path The router path
 */
const getWrappedMain = path => mount(
  <MemoryRouter initialEntries={ [path] }><Main /></MemoryRouter>
);

it('should render the App component on path "/"', () => {
  const wrapped = getWrappedMain('/');
  expect(wrapped.find(App)).toHaveLength(1);
})

it('should render the App component on path "/posts"', () => {
  const wrapped = getWrappedMain('/posts');
  expect(wrapped.find(App)).toHaveLength(1);
})

it('should render the NotFound component on unknown path', () => {
  const wrapped = getWrappedMain('/foobar')
  expect(wrapped.find(NotFound)).toHaveLength(1);
})