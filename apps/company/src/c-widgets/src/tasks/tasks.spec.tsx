import { render } from '@testing-library/react';
import { TestCompant } from './TestCompant';

describe('TestComp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestCompant />);
    expect(baseElement).toBeTruthy();
  });
});
