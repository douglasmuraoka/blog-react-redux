/**
 * Component that renders the list of posts.
 * 
 * The posts should be retrieved from the Redux store.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from 'actions';

class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map(
      ({id, userId, title, body}) => <li key={id}>{title} by User:{userId}. {body}</li>
    );
  }

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}

const mapStateToProps = ({ posts }) => {
  return ({ posts });
}

export default connect(mapStateToProps, { fetchPosts })(PostList);