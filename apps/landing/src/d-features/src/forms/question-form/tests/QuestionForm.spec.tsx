import { fireEvent, render } from '@testing-library/react';
import { QuestionForm } from '../ui/QuestionForm';

describe('Question form tests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionForm />);
    expect(baseElement).toBeTruthy();
  });

  it('should show two errors if empty fields', () => {
    // given
    const { getByTestId, getAllByText } = render(<QuestionForm />);
    const submitBtn = getByTestId('question-form-submit');

    // when
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field cannot be empty')).toHaveLength(2);
  });

  it('should show erron if invalid email', () => {
    // given
    const { getByTestId, getAllByText } = render(<QuestionForm />);
    const submitBtn = getByTestId('question-form-submit');
    const emailInput = getByTestId('question-form-email');
    const messageInput = getByTestId('question-form-text');

    // when
    fireEvent.change(emailInput, {target: {value: 'wrong.com'}});
    fireEvent.change(messageInput, {target: {value: 'Message text'}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field is filled in incorrectly!')).toHaveLength(1);
  });

});
