import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from 'components/Main';
import Root from 'components/Root';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Root>,
  document.getElementById('root'));

document.getElementById('loading').remove();