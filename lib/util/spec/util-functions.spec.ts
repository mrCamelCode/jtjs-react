import { describe, expect, test } from 'vitest';
import { buildClassName, maskText } from '../util-functions';

describe('util-functions', () => {
  describe('buildClassName', () => {
    test('returns an empty string when no args are given', () => {
      expect(buildClassName()).toBe('');
      expect(buildClassName('')).toBe('');
      expect(buildClassName('', '')).toBe('');
      expect(buildClassName(undefined, '')).toBe('');
    });

    test('returns the formatted class when a class is given.', () => {
      expect(buildClassName('c1 c2 c3')).toBe('c1 c2 c3');
      expect(buildClassName('  c1 c2 c3 ')).toBe('c1 c2 c3');
    });

    test('returns the formatted class when multiple args are given.', () => {
      const expectation = 'c1 c2 c3';

      expect(buildClassName('c1 c2', 'c3')).toBe(expectation);
      expect(buildClassName('c1', 'c2 c3')).toBe(expectation);
      expect(buildClassName('  c1 c2', '     c3       ')).toBe(expectation);
      expect(buildClassName('c1', undefined, 'c2  ', 'c3', undefined, ''));
    });
  });

  describe('maskText', () => {
    test('will apply a mask', () => {
      expect(maskText('abc123d678', /\d/)).toBe('123678');
    });
  });
});
