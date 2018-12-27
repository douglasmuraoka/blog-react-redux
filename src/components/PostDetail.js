/**
 * Component responsible for showing the details of a single post,
 * as well as its comments.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComments, addComment } from 'actions';
import CommentForm from 'components/CommentForm';
import Button from 'components/Button';
// eslint-disable-next-line
import style from 'styles/PostDetail.scss';

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
    const { id: postId } = match.params;
    if (comments && comments[postId]) {
      const commentsNodes = comments[postId].reverse().map(({ id, name, body, email }) => 
        <div className='comment z-depth-3' key={id}>
          <h5>{name}</h5>
          <span className='comment-email'>{email}</span>
          <p>{body}</p>
        </div>
      );
      if (commentsNodes.length) {
        const { addComment, fetchComments } = this.props;
        return (
          <div>
            <section className='post-detail-comments'>
              <CommentForm postId={postId} onSubmit={addComment} />
              {commentsNodes}
            </section>
            <div className="divider"></div>
            <div className='post-detail-load-button-container'>
              <Button className='waves-effect waves-light' label='Load more comments' icon='expand_more'
                onClick={() => fetchComments(postId)} />
            </div>
          </div>
        );
      }
      return <div>No comments was found</div>;
    }
    return <div>Loading comments...</div>;
  }
  
  render() {
    const { post } = this.props;
    if (post) {
      const { title, body, userId } = post;
      return (
        <section className='post-detail container'>
          <h1>{title}</h1>
          <p className='flow-text'>{userId}</p>
          <p className='post-content flow-text'>{body}</p>
          <div className="divider"></div>
          {this.renderComments()}
        </section>
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

export default connect(mapStateToProps, { fetchPost, fetchComments, addComment })(PostDetail);