import postsReducer from 'reducers/posts';
import * as types from 'actions/types';

it('should return state when action type is unknown', () => {
  const state = postsReducer(undefined, { type: 'foo', payload: 'bar'});
  expect(state).toEqual(null);
});

it('should return state with posts when action type is FETCH_POSTS', () => {
  const state = postsReducer(null, { type: types.FETCH_POSTS, payload: {
    data: [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ]
  }});
  expect(state).toEqual({
    1: { id: 1, userId: 1, title: 'Post #1', body: 'foo'},
    2: { id: 2, userId: 2, title: 'Post #2', body: 'bar'}
  });
});

it('should append state with new posts when action type is FETCH_POSTS', () => {
  const state = postsReducer({
    0: { id: 0, author: { id : 0 }, title: 'Post #0', body: 'lorem' }
  }, { type: types.FETCH_POSTS, payload: {
    data: [
      { id: 1, author: { id : 1 }, title: 'Post #1', body: 'foo' },
      { id: 2, author: { id : 2 }, title: 'Post #2', body: 'bar' }
    ]
  }});
  expect(state).toEqual({
    0: { id: 0, author: { id : 0 }, title: 'Post #0', body: 'lorem' },
    1: { id: 1, author: { id : 1 }, title: 'Post #1', body: 'foo' },
    2: { id: 2, author: { id : 2 }, title: 'Post #2', body: 'bar' }
  });
});

it('should return state with posts when action type is FETCH_POST', () => {
  const state = postsReducer(null, { type: types.FETCH_POST, payload: {
    data: { id: 3, author: { id: 3 }, title: 'Post #3', body: 'foo' }
  }});
  expect(state).toEqual({
    3: { id: 3, author: { id: 3}, title: 'Post #3', body: 'foo' }
  });
});

it('should append state with posts when action type is FETCH_POST', () => {
  const state = postsReducer({
    0: { id: 0, author: { id: 0 }, title: 'Post #0', body: 'lorem' }
  }, { type: types.FETCH_POST, payload: {
    data: { id: 3, author: { id: 3 }, title: 'Post #3', body: 'foo' }
  }});
  expect(state).toEqual({
    0: { id: 0, author: { id: 0 }, title: 'Post #0', body: 'lorem' },
    3: { id: 3, author: { id: 3 }, title: 'Post #3', body: 'foo' }
  });
});

it('should clear and posts when action type is CLEAR_POSTS', () => {
  const state = postsReducer({
    0: { userId: 0, title: 'Post #0', body: 'lorem' }
  }, { type: types.CLEAR_POSTS });
  expect(state).toEqual(null);
});