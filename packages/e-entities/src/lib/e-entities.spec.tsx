import { render } from '@testing-library/react';

import EEntities from './e-entities';

describe('EEntities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EEntities />);
    expect(baseElement).toBeTruthy();
  });
});
