/**
 * Module that contains all actions creators of this application.
 */
import axios from 'axios';
import * as types from 'actions/types';

const SERVER_URL = 'http://jsonplaceholder.typicode.com';

/**
 * Fetches posts data from the server
 */
export const fetchPosts = () => ({
  type: types.FETCH_POSTS,
  payload: axios.get(`${SERVER_URL}/posts`)
});

/**
 * Fetches a post data by its id
 * 
 * @param {!String} id The post id
 */
export const fetchPost = id => ({
  type: types.FETCH_POST,
  payload: axios.get(`${SERVER_URL}/posts/${id}`)
});

/**
 * Fetches the list of comments of a post
 * 
 * @param {!String} id The post id
 */
export const fetchComments = id => ({
  type: types.FETCH_COMMENTS,
  payload: new Promise((resolve, reject) => {
    axios.get(`${SERVER_URL}/comments`, { data: { postId: id } }).then(response => {
      resolve({
        postId: id,
        response
      });
    }).catch(reject);
  })
});

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
export const addComment = comment => ({
  type: types.ADD_COMMENT,
  payload: axios.post(`${SERVER_URL}/comments`, comment)
});