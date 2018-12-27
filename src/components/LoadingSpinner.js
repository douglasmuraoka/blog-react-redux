import React from 'react';
// eslint-disable-next-line
import style from 'styles/LoadingSpinner.scss';

export default () => (
  <div className='loading-spinner-container'>
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