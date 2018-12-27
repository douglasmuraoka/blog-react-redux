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

  renderPostDetailsMock() {
    return (
      <section className='post-detail container'>
        <div className='post-detail-mock'>
          <div className='post-detail-title'>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
          <div className='post-content'>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
          <div className="divider"></div>
          <div className='comments-mock z-depth-3'>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderCommentsLoadingSpinner() {
    return (
      <div className='comments-load-spinner-container'>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderComments() {
    const { comments, match } = this.props;
    const { id: postId } = match.params;
    if (comments && comments[postId]) {
      let commentsNodes = comments[postId].reverse().map(({ id, name, body, author }) => 
        <section className='comment z-depth-3' key={id}>
          <div className='comment-author-container'>
            <img className='comment-author-avatar z-depth-2' src={author.avatarUrl} alt='Comment author avatar' />
            <div>
              <h5>{name}</h5>
              <span className='comment-author'>{author.name}</span>
              <span className='comment-author comment-author-email'>{author.email}</span>
            </div>
          </div>
          <p>{body}</p>
        </section>
      );
      if (!commentsNodes.length) {
        commentsNodes = (
          <div>
            <h5 className='comments-not-found'>No comments yet</h5>
          </div>
        );
      }
      const { addComment, fetchComments } = this.props;
      // Renders the comment form, as well as the
      // button to fetch more comments
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
    return this.renderCommentsLoadingSpinner();
  }
  
  render() {
    const { post } = this.props;
    if (post) {
      const { title, body, author } = post;
      const contentParagraphs = body.split('\n').map(paragraph => (
        <p className='post-content flow-text'>{paragraph}</p>
      ));
      return (
        <section className='post-detail container'>
          <h1 className='post-detail-title'>{title}</h1>
          <div className='post-detail-author'>
            <img className='z-depth-2' src={author.avatarUrl} alt={`${author.name}'s avatar (post author)`} />
            <div>
              <p className='post-detail-author-name'>{author.name}</p>
              <p className='post-detail-author-email'>{author.email}</p>
            </div>
          </div>
          {contentParagraphs}
          <div className="divider"></div>
          {this.renderComments()}
        </section>
      );
    } else {
      return this.renderPostDetailsMock();
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