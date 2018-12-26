/**
 * Component responsible for rendering the blog application,
 * with the post list.
 */
import React from 'react';
import PostList from 'components/PostList';
import { REFRESH_POSTLIST_TIMEOUT } from 'settings';

export default () => <div><PostList refreshTimeout={REFRESH_POSTLIST_TIMEOUT} /></div>;