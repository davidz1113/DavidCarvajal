import { MockNgControl } from '../testing/mocks/mocks';
import { InputStatusDirective } from './input-status.directive';

describe('InputStatusDirective', () => {
  it('should create an instance', () => {
    const directive = new InputStatusDirective(new MockNgControl());
    expect(directive).toBeTruthy();
  });
});
