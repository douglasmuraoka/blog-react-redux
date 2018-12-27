import React from 'react';
import PostDetail from 'components/PostDetail';
import Root from 'components/Root';
import { mount } from 'enzyme';
import moxios from 'moxios';
import CommentForm from 'components/CommentForm';
import LoadingSpinner from 'components/LoadingSpinner';

let wrapped;

afterEach(() => {
  wrapped.unmount();
})

it('should render loading when post is not loaded', () => {
  wrapped = mount(<Root><PostDetail match={{ params: { id: 1 } }} /></Root>);
  expect(wrapped.find('.post-detail-mock')).toHaveLength(1);
});

it('should render post details', () => {
  const initialState = {
    posts: {
      1: { author: { id: 1 }, title: 'bar', body: 'foo' }
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
    response: { id: 1, author: { id: 1 }, body: 'post fetch', title: 'empty store' }
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

it('should render comments', () => {
  const initialState = {
    posts: {
      1: { id: 1, author: { id: 1 }, title: 'bar', body: 'foo' }
    },
    comments: {
      1: [{ id: 1, name: 'my comment', author: { email: 'my@comment.com' }, body: 'lorem ipsum' }]
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  const renderedContent = wrapped.render().text();
  expect(renderedContent).toContain('my comment');
  expect(renderedContent).toContain('lorem ipsum');
});

it('should fetch comments when store does not contains comments', done => {
  moxios.install();
  moxios.stubRequest(/\/comments/g, {
    status: 200,
    response: [{ postId: 1, id: 1, name: 'the comment name', author: { email: 'myemail@foo.com' }, body: 'my comment' }]
  });

  const initialState = {
    posts: {
      1: { id: 1, author: { id: 1 }, title: 'bar', body: 'foo' }
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  moxios.wait(() => {
    wrapped.update();
    const renderedContent = wrapped.render().text();
    expect(renderedContent).toContain('the comment name');
    expect(renderedContent).toContain('my comment');
    moxios.uninstall();
    done();
  });
});

it('should render a button that loads more comments', done => {
  moxios.install();
  const mockedResponse = [
    { postId: 1, id: 1, name: 'Comment #1', author: { email: 'foo@foo.com' }, body: 'Content #1' },
    { postId: 1, id: 2, name: 'Comment #2', author: { email: 'bar@bar.com' }, body: 'Content #2' }
  ];
  moxios.stubRequest(/\/comments/g, {
    status: 200,
    response: mockedResponse
  });

  const initialState = {
    posts: {
      1: { author: { id: 1 }, title: 'bar', body: 'foo' }
    },
    comments: {
      1: [{ id: 0, name: 'my comment', author: { email: 'my@comment.com' }, body: 'lorem ipsum' }]
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  wrapped.find('.post-detail-load-button-container>Button').simulate('click');
  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find('.comment')).toHaveLength(3);
    done();
  });
});

it('should render the comments loading state', () => {
  const initialState = {
    posts: {
      1: { author: { id: 1 }, title: 'bar', body: 'foo' }
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  expect(wrapped.find(LoadingSpinner)).toHaveLength(1);
});

it('should render the comments empty state', () => {
  const initialState = {
    posts: {
      1: { author: { id: 1 }, title: 'bar', body: 'foo' }
    },
    comments: {
      1: []
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  const renderedContent = wrapped.render().text();
  expect(renderedContent).toContain('No comments yet');
});

it('should render a CommentForm', () => {
  const initialState = {
    posts: {
      1: { author: { id: 1 }, title: 'bar', body: 'foo' }
    },
    comments: {
      1: [{ id: 0, name: 'my comment', author: { email: 'my@comment.com' }, body: 'lorem ipsum' }]
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 } }} /></Root>);
  expect(wrapped.find(CommentForm)).toHaveLength(1);
});

it('should render a loading spinner when loading more comments', done => {
  moxios.install();
  moxios.stubRequest(/\/comments/g, {
    status: 200,
    response: []
  });

  const initialState = {
    posts: {
      1: { id: 1, author: { id: 1 }, title: 'Post #1', body: 'foo'}
    },
    comments: {
      1: []
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 }}} /></Root>);
  wrapped.find('.post-detail-load-button-container>Button').simulate('click');
  wrapped.update();
  expect(wrapped.find(LoadingSpinner)).toHaveLength(1);

  moxios.wait(() => {
    wrapped.update();

    moxios.uninstall();
    expect(wrapped.find(LoadingSpinner)).toHaveLength(0);
    done();
  });
});

it('should render an error message when received from store state', () => {
  const initialState = {
    posts: {
      1: { id: 1, author: { id: 1 }, title: 'Post #1', body: 'foo'}
    },
    comments: {
      error: new Error('foo')
    }
  };
  wrapped = mount(<Root initialState={initialState}><PostDetail match={{ params: { id: 1 }}} /></Root>);
  expect(wrapped.find('.post-detail-error-message').render().text()).toBe('Error while loading comments')
});