import { render } from '@testing-library/react';

import AApp from './a-app';

describe('AApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AApp />);
    expect(baseElement).toBeTruthy();
  });
});
