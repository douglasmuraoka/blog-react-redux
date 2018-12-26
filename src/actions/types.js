/**
 * Enum file that holds all action types of this application.
 */

// Dispatched to fetch the list of posts
export const FETCH_POSTS = 'fetch_posts';

// Dispatched to fetch a single post data
export const FETCH_POST = 'fetch_post';

// Dispatched to fetch comments of a single post
export const FETCH_COMMENTS = 'fetch_comments';

// Dispatched when the posts are outdated and
// needs to be cleared
export const CLEAR_POSTS = 'clear_posts';

// Dispatched when a comment is added to a post
export const ADD_COMMENT = 'add_comment';