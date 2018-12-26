/**
 * Component responsible for showing the details of a single post,
 * as well as its comments.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from 'actions';

class PostDetail extends Component {
  componentWillMount() {
    const postId = this.props.match.params.id;
    if (!this.props.post) {
      this.props.fetchPost(postId);
    }
    if (!this.props.comments || !this.props.comments[postId]) {
      this.props.fetchComments(postId);
    }
  }

  renderComments() {
    const { comments, match } = this.props;
    if (comments && comments[match.params.id]) {
      const commentsNodes = comments[match.params.id].map(({ id, name, body }) => 
        <li key={id}>
          <h3>{name}</h3>
          <p>{body}</p>
        </li>
      );
      return <ul>{commentsNodes}</ul>
    }
    return null;
  }
  
  render() {
    const { post, match, fetchComments } = this.props;
    if (post) {
      const { id, title, body, userId } = post;
      const { id: postId } = match.params;
      return (
        <div>
          <h1>{title}: ID {id}</h1>
          <h2>by {userId}</h2>
          <p>{body}</p>
          {this.renderComments()}
          <button onClick={() => fetchComments(postId)}>Load more comments</button>
        </div>
      );
    } else {
      return <div>Loading ...</div>
    }
  }
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
  return {
    post: posts && posts[ownProps.match.params.id],
    comments
  };
};

export default connect(mapStateToProps, { fetchPost, fetchComments })(PostDetail);