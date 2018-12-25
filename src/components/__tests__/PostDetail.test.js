import React from 'react';
import PostDetail from 'components/PostDetail';
import Root from 'components/Root';
import { mount } from 'enzyme';
import moxios from 'moxios';

let wrapped;

it('should render loading when post is not loaded', () => {
  wrapped = mount(<Root><PostDetail match={{ params: { id: 1 } }} /></Root>);
  expect(wrapped.render().text()).toContain('Loading ...');
});

it('should render post details', () => {
  const initialState = {
    posts: {
      1: { userId: 1, title: 'bar', body: 'foo' }
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  const renderedContent = wrapped.render().text();
  expect(renderedContent).toContain('foo');
  expect(renderedContent).toContain('bar');
});

it('should fetch post data when store does not contains posts', done => {
  moxios.install();
  moxios.stubRequest(/\/posts\/1/g, {
    status: 200,
    response: { id: 1, userId: 1, body: 'post fetch', title: 'empty store' }
  });

  wrapped = mount(<Root><PostDetail match={{ params: { id: 1 } }} /></Root>);
  moxios.wait(() => {
    wrapped.update();
    const renderedContent = wrapped.render().text();
    expect(renderedContent).toContain('post fetch');
    expect(renderedContent).toContain('empty store');
    moxios.uninstall();
    done();
  });
});