import { eventBus } from './eventbus';

describe('eventbus', () => {
  it('should should an $emit function', () => {
    expect(typeof eventBus.$emit).toBe('function');
  });
  it('should should an $on function', () => {
    expect(typeof eventBus.$on).toBe('function');
  });
});
