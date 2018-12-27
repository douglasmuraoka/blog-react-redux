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
import Parallax from 'components/Parallax';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
// eslint-disable-next-line
import style from 'styles/PostList.scss';

// Last fetch date.
// Needed to control when to force refreshing the post list.
let lastFetch;

// The oldest post date.
// Needed when fetching older posts when the user clicks the
// "load more posts" button.
let oldestPostDate;

class PostList extends Component {
  state = {
    isLoadingPosts: false
  };

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

  componentWillReceiveProps() {
    if (this.state.isLoadingPosts) {
      this.setState({
        isLoadingPosts: false
      });
    }
  }

  renderPosts() {
    let { posts } = this.props;
    posts = Object.values(posts);

    // Orders posts by creation date, descendent
    posts.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
    oldestPostDate = posts[posts.length - 1].createdAt;

    return posts.map(post => {
      const { id, author, title, body } = post;

      // FIXME: get image for each post
      return (
        <Parallax key={id} className='post' imgSrc='https://materializecss.com/images/parallax1.jpg'>
          <div className='post-title-container'>
            <Link className='post-title' to={`/posts/${id}`}>{title}</Link>
            <p className='post-author'>by {author.name}</p>
          </div>
          <p className='post-preview-container'>
            <span className='post-preview'>
              {body.length > 100 ? `${body.substr(0, 100)}...` : body}
            </span>
          </p>
          <Link className='post-read-more' to={`/posts/${id}`}>Read more</Link>
        </Parallax>
      );
    });
  }

  renderMockPosts() {
    return Array(4).fill('').map((_, index) => (
      <div className='post-mock z-depth-3' key={index}>
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
    ));
  }

  renderLoadMorePostsButton = () => {
    if (this.state.isLoadingPosts) {
      return <LoadingSpinner />
    }
    const loadPosts = () => {
      this.props.fetchPosts(oldestPostDate);
      this.setState({ isLoadingPosts: true });
    };
    return <Button className='waves-effect waves-light' label='Load more posts' icon='expand_more'
      onClick={loadPosts} />;
  }

  render() {
    const { posts, error } = this.props;
    if (error) {
      // This should be handled by the ErrorBoundary component
      throw new Error(error);
    }
    if (!posts) {
      return (
        <section className='container'>
          <div className='postsContainer'>
            {this.renderMockPosts()}
          </div>
        </section>
      );
    }
    return (
      <section className='container'>
        <div className='postsContainer'>{this.renderPosts()}</div>
        <div className='post-list-load-more-container'>
          {this.renderLoadMorePostsButton()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return ({
    posts,
    error: posts && posts.error
  });
}

PostList.propTypes = {
  // Timeout to force a post list refresh
  refreshTimeout: PropTypes.number
}

export default connect(mapStateToProps, { fetchPosts, clearPosts })(PostList);