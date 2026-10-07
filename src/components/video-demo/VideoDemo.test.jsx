import React from 'react';
import { render, fireEvent, act, screen, cleanup } from '@testing-library/react';
import VideoDemo from './VideoDemo';

jest.mock('three', () => ({ WebGLRenderer: class { constructor() { throw new Error('No GPU in unit tests'); } } }));
let frame, now, media;
beforeEach(() => {
  now = 0;
  window.requestAnimationFrame = jest.fn(callback => { frame = callback; return 1; });
  window.cancelAnimationFrame = jest.fn();
  window.ResizeObserver = class { observe() {} disconnect() {} };
  media = { matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => media);
  SVGElement.prototype.getTotalLength = () => 100;
  SVGElement.prototype.getPointAtLength = distance => ({ x: distance, y: distance });
});
afterEach(cleanup);
function advance(seconds) {
  act(() => { for (let i = 0; i < seconds * 60; i++) { now += 1000 / 60; frame(now); } });
}
test('pause freezes clock and packet positions, resume continues, replay resets the whole scene', () => {
  const { container } = render(<VideoDemo />);
  const root = container.querySelector('main');
  advance(8);
  fireEvent.click(screen.getByRole('button', { name: /Pause Animation/ }));
  const time = root.dataset.time;
  const position = container.querySelector('.vd-input-packet').style.cssText;
  advance(2);
  expect(root.dataset.time).toBe(time);
  expect(container.querySelector('.vd-input-packet').style.cssText).toBe(position);
  fireEvent.click(screen.getByRole('button', { name: /Resume Animation/ }));
  advance(1);
  expect(Number(root.dataset.time)).toBeGreaterThan(Number(time));
  fireEvent.click(screen.getByRole('button', { name: /Replay Animation/ }));
  expect(root.dataset.time).toBe('0.000');
  expect(container.querySelector('.vd-core').style.visibility).toBe('hidden');
  expect([...container.querySelectorAll('.vd-agent')].every(node => node.style.visibility === 'hidden')).toBe(true);
  expect([...container.querySelectorAll('.vd-spoke')].every(node => node.style.strokeDashoffset === '1')).toBe(true);
});
test('reduced motion displays a complete static scene and disables animated controls', () => {
  media.matches = true;
  const { container } = render(<VideoDemo />);
  expect(container.querySelector('main').dataset.time).toBe('15.000');
  expect(container.querySelector('.vd-output').style.opacity).toBe('1');
  expect(screen.getByRole('button', { name: /Replay Animation/ }).disabled).toBe(true);
  advance(3);
  expect(container.querySelector('main').dataset.time).toBe('15.000');
  expect([...container.querySelectorAll('.vd-input-packet')].every(node => node.style.visibility === 'hidden')).toBe(true);
});
test('output bars rise on packet arrival and ambient input stays sparse', () => {
  const { container } = render(<VideoDemo />);
  advance(12.3);
  const bars = [...container.querySelectorAll('.vd-bars i')];
  expect(bars[0].style.transform).not.toBe('scaleY(0)');
  expect(bars[3].style.transform).toBe('scaleY(0)');
  advance(3.7);
  const visibleInputs = [...container.querySelectorAll('.vd-input-packet')].filter(node => node.style.visibility === 'visible');
  expect(visibleInputs).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: /Replay Animation/ }));
  expect(bars.every(node => node.style.transform === 'scaleY(0)')).toBe(true);
  expect(container.querySelector('[aria-current="step"]').textContent).toContain('DATA');
});
test('embedded animation waits for viewport entry and pauses offscreen without resetting', () => {
  let visibility;
  window.IntersectionObserver = class {
    constructor(callback) { visibility = callback; }
    observe() {}
    disconnect() {}
  };
  const { container } = render(<VideoDemo embedded />);
  const root = container.querySelector('.video-demo');
  advance(3);
  expect(root.dataset.time).toBe('0.000');
  act(() => visibility([{ isIntersecting: true, intersectionRatio: 0.6 }]));
  advance(2);
  const started = Number(root.dataset.time);
  expect(started).toBeGreaterThan(1);
  act(() => visibility([{ isIntersecting: false, intersectionRatio: 0 }]));
  advance(3);
  expect(Number(root.dataset.time)).toBe(started);
  act(() => visibility([{ isIntersecting: true, intersectionRatio: 0.6 }]));
  advance(1);
  expect(Number(root.dataset.time)).toBeGreaterThan(started);
  expect(container.querySelector('h1')).toBeNull();
});
