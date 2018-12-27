/**
 * Component responsible for defining the main application routes,
 * and handling the unknown routes.
 */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import App from 'components/App';
import NotFound from 'components/NotFound';
import PostDetail from 'components/PostDetail';
import ErrorBoundary from 'components/ErrorBoundary';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// eslint-disable-next-line
import style from 'styles/Main.scss';

// Only scrolls to top if current location (before finishing transition)
// is the PostList component
const onExitedTransition = location => {
  if (location.pathname === '/posts') {
    window.scrollTo(0, 0);
  }
};

export default withRouter(({ location }) =>
  <ErrorBoundary>
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 } } classNames={'fade'} onExited={() => onExitedTransition(location)}>
        <section className="route-section">
          <Switch location={location}>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route exact path="/posts" component={App} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  </ErrorBoundary>
);