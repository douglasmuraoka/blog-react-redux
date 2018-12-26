import { combineReducers } from 'redux';
import postsReducer from 'reducers/posts';
import commentsReducer from 'reducers/comments';

export default combineReducers({
  posts: postsReducer,
  comments: commentsReducer
});