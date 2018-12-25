/**
 * Component responsible for defining the main application routes,
 * and handling the unknown routes.
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from 'components/App';
import NotFound from 'components/NotFound';

export default () =>
  <Switch>
    <Route exact path="/">
      <Redirect to="/posts" />
    </Route>
    <Route exact path="/posts" component={App} />
    <Route component={NotFound} />
  </Switch>