import * as types from 'actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_COMMENTS:
      const postId = action.payload.postId;
      const newState = {...state};
      if (newState[postId]) {
        newState[postId] = [...newState[postId], ...action.payload.response.data];
      } else {
        newState[postId] = [...action.payload.response.data];
      }
      return newState;
    default:
      return state;
  }
}