import * as types from 'actions/types';

export default (state = null, { type, payload }) => {
  switch(type) {
    case types.FETCH_POSTS:
      if (payload && payload.error) {
        return { error: payload.error };
      }
      if (state) delete state.error;
      // Reduces the list of posts into an object, where
      // the key is the post id, and its value is the post data.

      // The reason for this is that when we go to the post details
      // view, we can easily find the post data by its id :)
      const data = payload.data.reduce((acc, data) => {
        const { id } = data;
        acc[id] = data;
        return acc;
      }, {});
      return {...state, ...data};
    case types.FETCH_POST:
      if (payload && payload.error) {
        return { error: payload.error };
      }
      if (state) delete state.error;
      const { id } = payload.data;
      const newState = {...state};
      newState[id] = payload.data;
      return newState;
    case types.CLEAR_POSTS:
      return null;
    default:
      return state;
  }
}