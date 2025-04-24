import { vi } from 'vitest';

describe('Test Vi Import', () => {
  it('should recognize vi', () => {
    expect(vi.fn).toBeDefined();
  });
});