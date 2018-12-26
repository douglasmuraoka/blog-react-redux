import * as types from 'actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_COMMENTS:
      let postId = action.payload.postId;
      let newState = {...state};
      if (newState[postId]) {
        newState[postId] = [...newState[postId], ...action.payload.response.data];
      } else {
        newState[postId] = [...action.payload.response.data];
      }
      return newState;
    case types.ADD_COMMENT:
      const comment = action.payload.data;
      postId = comment.postId;
      newState = {...state};
      if (newState[postId]) {
        newState[postId] = [...newState[postId], comment];
      } else {
        newState[postId] = [comment];
      }
      return newState;
    default:
      return state;
  }
}