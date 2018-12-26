/**
 * A form component for posting comments
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CommentForm extends Component {
  state = {
    body: '',
    name: '',
    email: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state, postId: this.props.postId });
    this.setState({
      body: '',
      name: '',
      email: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea name='body' onChange={e => this.setState({ body: e.target.value })} value={this.state.body}></textarea>
        <input name='name' onChange={e => this.setState({ name: e.target.value })} value={this.state.name}></input>
        <input name='email' type='email' onChange={e => this.setState({ email: e.target.value })} value={this.state.email}></input>
        <button>Add comment</button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  postId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired
}