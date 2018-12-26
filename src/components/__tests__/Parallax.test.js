import React from 'react';
import { shallow } from 'enzyme';
import Parallax from '../Parallax';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Parallax imgSrc='image' />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a parallax-container', () => {
  expect(wrapped.find('.parallax-container')).toHaveLength(1);
});

it('has a parallax', () => {
  expect(wrapped.find('.parallax-container>.parallax')).toHaveLength(1);
});

it('has a image with src defined', () => {
  expect(wrapped.find('.parallax-container>.parallax>img[src="image"]')).toHaveLength(1);
});