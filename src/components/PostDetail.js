/**
 * Component responsible for showing the details of a single post,
 * as well as its comments.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'actions';

class PostDetail extends Component {
  componentWillMount() {
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }
  
  render() {
    if (this.props.post) {
      const { id, title, body, userId } = this.props.post;
      return (
        <div>
          <h1>{title}: ID {id}</h1>
          <h2>by {userId}</h2>
          <p>{body}</p>
        </div>
      );
    } else {
      return <div>Loading ...</div>
    }
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  return {
    post: posts[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchPost })(PostDetail);