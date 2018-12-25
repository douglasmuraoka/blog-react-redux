/**
 * A helper wrapper component that provides us an easy way to
 * set the initial state of the Redux store in both production
 * and test environments.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

export default ({ children, initialState }) =>
  <Provider store={createStore(reducers, initialState)}>
    {children}
  </Provider>