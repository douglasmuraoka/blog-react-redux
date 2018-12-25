import postsReducer from 'reducers/posts';

it('should return state when action type is unknown', () => {
  const state = postsReducer([], { type: 'foo', payload: 'bar'});
  expect(state).toEqual([]);
});