import React from 'react';
import { mount } from 'enzyme';
import PostList from 'components/PostList';
import Root from 'components/Root';
import { MemoryRouter } from 'react-router-dom';
import moxios from 'moxios';

it('should render a li for each post', () => {
  const initialState = {
    posts: [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ]
  };
  const wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('li')).toHaveLength(2);
});

it('should render a button that loads more posts', done => {
  moxios.install();
  const mockedResponse = [
    {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
    {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
  ];
  moxios.stubRequest(/\/posts/g, {
    status: 200,
    response: mockedResponse
  });

  const wrapped = mount(<Root><MemoryRouter><PostList /></MemoryRouter></Root>);
  wrapped.find('button').simulate('click');
  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find('li')).toHaveLength(2);
    done();
  });
});