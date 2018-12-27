/**
 * A form component for posting comments
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentFormField from 'components/CommentFormField';
import Button from 'components/Button';
// eslint-disable-next-line
import style from 'styles/CommentForm.scss';

export default class CommentForm extends Component {
  state = {
    body: '',
    name: '',
    email: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.body.length >= 5) {
      this.props.onSubmit({ ...this.state, postId: this.props.postId });
      this.setState({
        body: '',
        name: '',
        email: ''
      });
    }
  }

  render() {
    const bodyChangeHandler = ({ target }) => {
      const { value, classList } = target;
      this.setState({ body: value });
      if (value.length < 5) {
        target.setCustomValidity('Comment should have at least 5 characters');
        if (Array.from(classList).indexOf('valid') !== -1) {
          classList.replace('valid', 'invalid');
        } else {
          classList.add('invalid');
        }
      } else {
        target.setCustomValidity('');
        classList.replace('invalid', 'valid');
      }
    };
    return (
      <div className="comment-form-container z-depth-3">
        <h5>Leave your comment</h5>
        <form onSubmit={this.handleSubmit}>
          <CommentFormField id='email-input' name='email' type='email' label='E-mail'
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email} />
          <CommentFormField id='name-input' name='name' label='Title'
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name} />
          <CommentFormField id='comment-input' name='body' label='Comment'
            onChange={bodyChangeHandler}
            value={this.state.body} type='textarea' />
          <Button className='waves-effect waves-light' type='submit' label='Add comment' icon='send' />
        </form>
      </div>
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