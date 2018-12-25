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