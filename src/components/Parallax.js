/**
 * Wrapper component that provides the parallax effect on
 * an image.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js'

export default class Parallax extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    M.Parallax.init(this.ref.current);
  }

  render() {
    const className = this.props.className
      ? `${this.props.className} parallax-container`
      : 'parallax-container';
    return (
      <div className={className}>
        <div className='parallax' ref={this.ref}>
          <img src={this.props.imgSrc} alt='Parallax' />
        </div>
        {this.props.children}
      </div>
    );
  }
}

Parallax.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string.isRequired
}