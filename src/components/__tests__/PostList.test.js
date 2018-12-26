import React from 'react';
import { mount } from 'enzyme';
import PostList from 'components/PostList';
import Root from 'components/Root';
import { MemoryRouter, Link } from 'react-router-dom';
import moxios from 'moxios';
import Parallax from 'components/Parallax';

let wrapped;

afterEach(() => {
  wrapped.unmount();
})

it('should render a Parallax for each post', () => {
  const initialState = {
    posts: {
      1: { userId: 1, title: 'Post #1', body: 'foo'},
      2: { userId: 2, title: 'Post #2', body: 'bar'}
    }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find(Parallax)).toHaveLength(2);
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

  const initialState = {
    posts: { 1: {userId: 1, title: 'Post #1', body: 'foo'} }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  wrapped.find('button').simulate('click');
  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find(Parallax)).toHaveLength(2);
    done();
  });
});

it('should truncate post content greater than 100 characters', () => {
  const bigStr = Array(150).fill('A').join('');
  const initialState = {
    posts: { 1: {userId: 1, title: 'Post #1', body: bigStr} }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('.post-preview').render().text()).toEqual(
    `${Array(100).fill('A').join('')}...`
  );
});

it('should fully render post content lesser than or equal to 100 characters', () => {
  const bigStr = Array(100).fill('A').join('');
  const initialState = {
    posts: { 1: {userId: 1, title: 'Post #1', body: bigStr} }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('.post-preview').render().text()).toEqual(bigStr);
});

it('should fetch posts on mount', done => {
  moxios.install();
  moxios.stubRequest(/\/posts/g, {
    status: 200,
    response: [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ]
  });
  wrapped = mount(<Root><MemoryRouter><PostList /></MemoryRouter></Root>);
  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find(Parallax)).toHaveLength(2);
    done();
  });
});

it('should render a loading state when no post was fetched', () => {
  wrapped = mount(<Root><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.render().text()).toContain('Loading Posts');
});

it('should refresh posts when it hits timeout', done => {
  moxios.install();
  moxios.stubRequest(/\/posts/g, {
    status: 200,
    response: [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ]
  });
  const initialState = {
    posts: { 0: {userId: 0, title: 'Post #0', body: 'lorem' } }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList refreshTimeout={0} /></MemoryRouter></Root>);
  expect(wrapped.render().text()).toContain('Loading Posts');

  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find(Parallax)).toHaveLength(2);
    done();
  });
});

it('should render post title', () => {
  const initialState = {
    posts: {
      1: { userId: 1, title: 'Post #1', body: 'foo'}
    }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('.post-title-container>.post-title').render().text()).toBe('Post #1');
});

it('should render post author id', () => {
  const initialState = {
    posts: {
      1: { userId: 1, title: 'Post #1', body: 'foo'}
    }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('.post-author').render().text()).toBe('by User:1');
});

it('should render post content preview', () => {
  const initialState = {
    posts: {
      1: { userId: 1, title: 'Post #1', body: 'foo'}
    }
  };
  wrapped = mount(<Root initialState={initialState}><MemoryRouter><PostList /></MemoryRouter></Root>);
  expect(wrapped.find('.post-preview').render().text()).toBe('foo');
});