/**
 * Component responsible for defining the main application routes,
 * and handling the unknown routes.
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from 'components/App';
import NotFound from 'components/NotFound';
import PostDetail from 'components/PostDetail';
import ErrorBoundary from 'components/ErrorBoundary';

export default () =>
  <ErrorBoundary>
    <Switch>
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <Route exact path="/posts" component={App} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <Route component={NotFound} />
    </Switch>
  </ErrorBoundary>