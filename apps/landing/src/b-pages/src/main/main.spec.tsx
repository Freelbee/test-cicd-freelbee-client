import { MeetSection } from '@landing/widgets';
import { render } from '@testing-library/react';
import '@landing/mocks/intersection';

describe('AApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetSection />);
    expect(baseElement).toBeTruthy();
  });
});
