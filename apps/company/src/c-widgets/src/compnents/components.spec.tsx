import { render } from '@testing-library/react';
import { Component } from './Component';

describe('TestComp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />);
    expect(baseElement).toBeTruthy();
  });
});