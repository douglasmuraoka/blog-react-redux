/**
 * Component that renders the list of posts.
 * 
 * The posts should be retrieved from the Redux store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, clearPosts } from 'actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Last fetch date.
// Needed to control when to force refreshing the post list.
let lastFetch;

class PostList extends Component {
  componentWillMount() {
    // If posts is not defined or last fetch time is greater than 1 minute,
    // fetches posts
    if (!this.props.posts || !lastFetch) {
      lastFetch = new Date();
      this.props.fetchPosts();
    } else if ((new Date() - lastFetch) > this.props.refreshTimeout) {
      lastFetch = new Date();
      this.props.clearPosts();
      this.props.fetchPosts();
    }
  }

  renderPosts() {
    const { posts } = this.props;
    return Object.keys(posts).map(id => {
      const { userId, title, body } = posts[id];
      return (
        <li key={id}>
          <h3>
            <Link to={`/posts/${id}`}>{title}</Link>
          </h3>
          <p>by User:{userId}</p>
          <p className='post-preview'>{body.length > 100 ? `${body.substr(0, 100)}...` : body}</p>
        </li>
      );
    });
  }

  render() {
    if (!this.props.posts) {
      return <div>Loading Posts...</div>;
    }
    return (
      <div>
        <ul>{this.renderPosts()}</ul>
        <button onClick={this.props.fetchPosts}>Load more posts</button>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return ({ posts });
}

PostList.propTypes = {
  // Timeout to force a post list refresh
  refreshTimeout: PropTypes.number
}

export default connect(mapStateToProps, { fetchPosts, clearPosts })(PostList);