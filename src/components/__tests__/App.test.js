import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import PostList from 'components/PostList';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
})

it('should render a post list', () => {
  expect(wrapped.find(PostList)).toHaveLength(1);
});