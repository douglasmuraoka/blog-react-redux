/**
 * Component that renders the list of posts.
 * 
 * The posts should be retrieved from the Redux store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from 'actions';
import { Link } from 'react-router-dom';

class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map(
      ({id, userId, title, body}) =>
        <li key={id}>
          <h3>
            <Link to={`/posts/${id}`}>{title}</Link>
          </h3>
          <p>by User:{userId}</p>
          <p className='post-preview'>{body.length > 100 ? `${body.substr(0, 100)}...` : body}</p>
        </li>
    );
  }

  render() {
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

export default connect(mapStateToProps, { fetchPosts })(PostList);