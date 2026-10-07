import { sequence } from './timeline';

test('architecture starts hidden and agents materialize after their connections', () => {
  expect(sequence(0).core).toBe(0);
  expect(sequence(0).agents.every(value => value === 0)).toBe(true);
  const spawning = sequence(4.8);
  expect(spawning.connections[0]).toBeGreaterThan(0);
  expect(spawning.agents[0]).toBe(0);
  expect(sequence(6.8).agents.every(value => value === 1)).toBe(true);
});
test('validation precedes output; reveal ends in non-restarting ambient mode', () => {
  expect(sequence(10.5).output).toBe(0);
  expect(sequence(12.5).output).toBe(1);
  expect(sequence(15).reveal).toBe(1);
  expect(sequence(120).ambient).toBe(true);
  expect(sequence(120).agents.every(value => value === 1)).toBe(true);
  expect(sequence(120).phase).toBe(105);
});
test('reduced motion resolves to complete architecture regardless of clock', () => {
  expect(sequence(0, true)).toEqual(sequence(15));
});
