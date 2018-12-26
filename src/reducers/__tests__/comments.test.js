import commentsReducer from 'reducers/comments';
import { FETCH_COMMENTS } from 'actions/types';

it('should return state when action type is unknown', () => {
  const state = commentsReducer(undefined, { type: 'foo', payload: 'bar'});
  expect(state).toEqual({});
});

it('should return state with comments', () => {
  const state = commentsReducer(undefined, { type: FETCH_COMMENTS, payload: {
    postId: 1,
    response: {
      data: [
        { postId: 1, id: 1, name: 'Comment #1', email: 'foo@foo.com', body: 'Content #1' },
        { postId: 1, id: 2, name: 'Comment #2', email: 'bar@bar.com', body: 'Content #2' }
      ]
    }
  }});
  expect(state).toEqual({
    1: [
      { postId: 1, id: 1, name: 'Comment #1', email: 'foo@foo.com', body: 'Content #1' },
      { postId: 1, id: 2, name: 'Comment #2', email: 'bar@bar.com', body: 'Content #2' }
    ]
  });
});

it('should append state with comments', () => {
  const state = commentsReducer({
    0: [
      { postId: 0, id: 1, name: 'Comment #0', email: 'lorem@ipsum.com', body: 'Content #0' },
    ]
  }, { type: FETCH_COMMENTS, payload: {
    postId: 1,
    response: {
      data: [
        { postId: 1, id: 1, name: 'Comment #1', email: 'foo@foo.com', body: 'Content #1' },
        { postId: 1, id: 2, name: 'Comment #2', email: 'bar@bar.com', body: 'Content #2' }
      ]
    }
  }});
  expect(state).toEqual({
    0: [
      { postId: 0, id: 1, name: 'Comment #0', email: 'lorem@ipsum.com', body: 'Content #0' },
    ],
    1: [
      { postId: 1, id: 1, name: 'Comment #1', email: 'foo@foo.com', body: 'Content #1' },
      { postId: 1, id: 2, name: 'Comment #2', email: 'bar@bar.com', body: 'Content #2' }
    ]
  });
});