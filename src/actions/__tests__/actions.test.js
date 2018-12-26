import * as actions from 'actions';
import * as types from 'actions/types';

describe('fetchPosts', () => {
  it('should return an action of type FETCH_POSTS', () => {
    const action = actions.fetchPosts();
    expect(action.type).toEqual(types.FETCH_POSTS);
  });
});

describe('fetchPost', () => {
  it('should return an action of type FETCH_POST', () => {
    const action = actions.fetchPost();
    expect(action.type).toEqual(types.FETCH_POST);
  });
});

describe('fetchComments', () => {
  it('should return an action of type FETCH_COMMENTS', () => {
    const action = actions.fetchComments();
    expect(action.type).toEqual(types.FETCH_COMMENTS);
  });
});