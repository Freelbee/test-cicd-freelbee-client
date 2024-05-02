import { fireEvent, render } from '@testing-library/react';
import { QuestionForm } from '../ui/QuestionForm';
import { ReduxStoreMock } from '../../../tests/__mocks__/redux/ReduxStoreMock';

describe('Question form tests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionForm />, {wrapper: ReduxStoreMock});
    expect(baseElement).toBeTruthy();
  });

  it('should show two errors if empty fields', () => {
    // given
    const { getByTestId, getAllByText } = render(<QuestionForm />, {wrapper: ReduxStoreMock});
    const submitBtn = getByTestId('question-form-submit');

    // when
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field cannot be empty')).toHaveLength(2);
  });

  it('should show erron if invalid email', () => {
    // given
    const { getByTestId, getAllByText } = render(<QuestionForm />, {wrapper: ReduxStoreMock});
    const submitBtn = getByTestId('question-form-submit');
    const emailInput = getByTestId('question-form-email');
    const messageInput = getByTestId('question-form-text');

    // when
    fireEvent.change(emailInput, {target: {value: 'wrong.com'}});
    fireEvent.change(messageInput, {target: {value: 'Message text'}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field is filled in incorrectly')).toHaveLength(1);
  });

  it('should not send empry spaces', () => {
    // given
    const { getByTestId, getAllByText } = render(<QuestionForm />, {wrapper: ReduxStoreMock});
    const submitBtn = getByTestId('question-form-submit');
    const emailInput = getByTestId('question-form-email');
    const messageInput = getByTestId('question-form-text');

    // when
    fireEvent.change(emailInput, {target: {value: 'compant@corp.com'}});
    fireEvent.change(messageInput, {target: {value: '     '}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field cannot be empty')).toHaveLength(1);
  });

});
