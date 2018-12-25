/**
 * Component responsible for defining the main application routes,
 * and handling the unknown routes.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/App';
import NotFound from 'components/NotFound';

export default () =>
  <Switch>
    <Route exact path="/" component={App} />
    <Route component={NotFound} />
  </Switch>