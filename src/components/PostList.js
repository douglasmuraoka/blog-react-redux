/**
 * Component that renders the list of posts.
 * 
 * The posts should be retrieved from the Redux store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostList extends Component {
  renderPosts() {
    return this.props.posts.map(
      post => <li key={post}>{post}</li>
    );
  }

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}

const mapStateToProps = ({ posts }) => {
  console.log(posts);
  return ({ posts });
}

export default connect(mapStateToProps)(PostList);