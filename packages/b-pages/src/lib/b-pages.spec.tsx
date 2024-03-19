import { render } from '@testing-library/react';

import BPages from './b-pages';

describe('BPages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BPages />);
    expect(baseElement).toBeTruthy();
  });
});
