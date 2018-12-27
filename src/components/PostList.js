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
// eslint-disable-next-line
import style from 'styles/PostList.scss';

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
      const { author, title, body } = posts[id];

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

  render() {
    if (!this.props.posts) {
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
        <button onClick={this.props.fetchPosts}>Load more posts</button>
      </section>
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