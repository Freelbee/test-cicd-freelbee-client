import { fireEvent, render } from '@testing-library/react';
import { ApplicationForm } from '../ApplicationForm';

describe('Application form tests', () => {
  it('should show two errors if empty fields', () => {
    // given
    const { getByTestId, getAllByText } = render(<ApplicationForm />);
    const submitBtn = getByTestId('landing-form-submit');

    // when
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field cannot be empty')).toHaveLength(2);
  });

  it('should show erron if invalid email', () => {
    // given
    const { getByTestId, getAllByText, queryByText } = render(<ApplicationForm />);
    const submitBtn = getByTestId('landing-form-submit');
    const emailInput = getByTestId('landing-form-email');
    const messageInput = getByTestId('landing-form-message');
    const phoneInput = getByTestId('landing-form-phone');

    // when
    fireEvent.change(emailInput, {target: {value: 'wrong.com'}});
    fireEvent.change(phoneInput, {target: {value: '9990091213'}});
    fireEvent.change(messageInput, {target: {value: 'Message text'}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field is filled in incorrectly!')).toHaveLength(1);
    expect(queryByText('The field cannot be empty')).toBeNull();
  });

});
