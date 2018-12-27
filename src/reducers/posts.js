import * as types from 'actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case types.FETCH_POSTS:
      // Reduces the list of posts into an object, where
      // the key is the post id, and its value is the post data.

      // The reason for this is that when we go to the post details
      // view, we can easily find the post data by its id :)
      const data = action.payload.data.reduce((acc, data) => {
        const { id } = data;
        acc[id] = data;
        return acc;
      }, {});
      return {...state, ...data};
    case types.FETCH_POST:
      const { id } = action.payload.data;
      const newState = {...state};
      newState[id] = action.payload.data;
      return newState;
    case types.CLEAR_POSTS:
      return null;
    default:
      return state;
  }
}