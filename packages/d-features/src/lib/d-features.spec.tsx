import { render } from '@testing-library/react';

import DFeatures from './d-features';

describe('DFeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DFeatures />);
    expect(baseElement).toBeTruthy();
  });
});
