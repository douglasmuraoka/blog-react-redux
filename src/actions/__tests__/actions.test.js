import * as actions from 'actions';
import * as types from 'actions/types';
import moxios from 'moxios';

describe('fetchPosts', () => {
  it('should return an action of type FETCH_POSTS', () => {
    const action = actions.fetchPosts();
    expect(action.type).toEqual(types.FETCH_POSTS);
  });

  it('should return an action with the /posts response payload', async () => {
    moxios.install();
    const mockedResponse = [
      {id: 1, userId: 1, title: 'Post #1', body: 'foo'},
      {id: 2, userId: 2, title: 'Post #2', body: 'bar'}
    ];
    moxios.stubRequest(/\/posts/g, {
      status: 200,
      response: mockedResponse
    });

    const action = actions.fetchPosts();
    const response = await action.payload;
    try {
      expect(response.data).toEqual(mockedResponse);
    } finally {
      moxios.uninstall();
    }
  });
});