import * as types from 'actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_POSTS:
      // Reduces the list of posts into an object, where
      // the key is the post id, and its value is the post data.

      // The reason for this is that when we go to the post details
      // view, we can easily find the post data by its id :)
      const data = action.payload.data.reduce((acc, data) => {
        const { id, ...rest } = data;
        acc[id] = rest;
        return acc;
      }, {});
      return {...state, ...data};
    case types.FETCH_POST:
      const { id, ...rest } = action.payload.data;
      const newState = {...state};
      newState[id] = rest;
      return newState;
    default:
      return state;
  }
}