/**
 * Module that contains all actions creators of this application.
 */
import axios from 'axios';
import * as types from 'actions/types';

const SERVER_URL = 'http://localhost:5000';

/**
 * Fetches 10 posts data from the server, ordered
 * by post creation date.
 * 
 * @param {String} createdAtMaxValue The most recent
 * creation date fetched.
 */
export const fetchPosts = createdAtMaxValue => {
  let query = '_sort=createdAt&_order=desc&_limit=10';
  
  if (createdAtMaxValue) {
    const createdAtMaxDate = new Date(createdAtMaxValue);

    // We need to descrease 1ms from the date, so we that
    // the oldest post won't be fetched again.
    // json-server queries doesn't accepts the "lt" operator :(
    const createdAtConstraint = new Date(createdAtMaxDate - 1).toISOString();
    query += `&createdAt_lte=${createdAtConstraint}`;
  }
  return {
    type: types.FETCH_POSTS,
    payload: axios.get(`${SERVER_URL}/posts?${query}`).catch(e => ({ error: e }))
  }
};

/**
 * Fetches a post data by its id
 * 
 * @param {!String} id The post id
 */
export const fetchPost = id => ({
  type: types.FETCH_POST,
  payload: axios.get(`${SERVER_URL}/posts/${id}`).catch(e => ({ error: e }))
});

/**
 * Fetches the 3 last of comments of a post.
 * 
 * @param {!String} id The post id
 * @param {String} createdAtMaxValue The most recent
 * creation date fetched.
 */
export const fetchComments = (id, createdAtMaxValue) => {
  let query = `postId=${id}&_sort=createdAt&_order=desc`;
  
  if (createdAtMaxValue) {
    const createdAtMaxDate = new Date(createdAtMaxValue);

    // We need to descrease 1ms from the date, so we that
    // the oldest post won't be fetched again.
    // json-server queries doesn't accepts the "lt" operator :(
    const createdAtConstraint = new Date(createdAtMaxDate - 1).toISOString();
    query += `&createdAt_lte=${createdAtConstraint}&_limit=10`;
  } else {
    query += '&_limit=3';
  }
  return {
    type: types.FETCH_COMMENTS,
    payload: new Promise((resolve, reject) => {
      axios.get(`${SERVER_URL}/comments?${query}`).then(response => {
        resolve({
          postId: id,
          response
        });
      }).catch(reject);
    }).catch(e => ({ error: e }))
  };
};

/**
 * Clears the post list
 */
export const clearPosts = () => ({
  type: types.CLEAR_POSTS
});

/**
 * Adds a comment to a post
 * 
 * @param {!String} comment.postId The Post id
 * @param {!String} comment.body Comment content
 * @param {!String} comment.name Comment title
 * @param {!String} comment.email Comment author email
 */
export const addComment = comment => {
  // Mocks a logged user, so we can push comment author
  // without errors.
  // If we had a real back-end, we could've pushed only
  // the user id...
  const loggedUser = {
    name: 'Myself',
    email: comment.email,
    avatarUrl: 'https://randomuser.me/api/portraits/med/lego/6.jpg'
  };
  delete comment.email;
  comment.author = loggedUser;
  return {
    type: types.ADD_COMMENT,
    payload: axios.post(`${SERVER_URL}/comments`, comment).catch(e => ({ error: e }))
  };
};