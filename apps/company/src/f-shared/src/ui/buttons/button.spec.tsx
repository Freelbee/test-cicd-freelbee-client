import { render } from '@testing-library/react';
import { CompanyButton } from './CompanyButton';

describe('TestComp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyButton />);
    expect(baseElement).toBeTruthy();
  });
});
