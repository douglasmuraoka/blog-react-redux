import * as types from 'actions/types';

export default (state = {}, { type, payload }) => {
  switch(type) {
    case types.FETCH_COMMENTS:
      if (payload && payload.error) {
        return { error : payload.error };
      }
      delete state.error;
      let postId = payload.postId;
      let newState = {...state};
      if (newState[postId]) {
        newState[postId] = [...newState[postId], ...payload.response.data];
      } else {
        newState[postId] = [...payload.response.data];
      }
      return newState;
    case types.ADD_COMMENT:
      if (payload && payload.error) {
        return { error: payload.error };
      }
      delete state.error;
      const comment = payload.data;
      postId = comment.postId;
      newState = {...state};
      if (newState[postId]) {
        newState[postId] = [comment, ...newState[postId]];
      } else {
        newState[postId] = [comment];
      }
      return newState;
    default:
      return state;
  }
}