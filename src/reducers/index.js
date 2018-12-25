import { combineReducers } from 'redux';
import postsReducer from 'reducers/posts';

export default combineReducers({
  posts: postsReducer
});