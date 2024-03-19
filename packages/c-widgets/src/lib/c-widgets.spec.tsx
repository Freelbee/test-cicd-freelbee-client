import { render } from '@testing-library/react';

import CWidgets from './c-widgets';

describe('CWidgets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CWidgets />);
    expect(baseElement).toBeTruthy();
  });
});
