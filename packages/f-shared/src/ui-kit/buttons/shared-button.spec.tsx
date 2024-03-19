import { render } from '@testing-library/react';
import { Button } from './Button';
import React from 'react';

describe('TestComp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button text={'button'} />);
    expect(baseElement).toBeTruthy();
  });
});
