import { fireEvent, render } from '@testing-library/react';
import { ApplicationModalForm } from '../ApplicationForm';
import { AppRouterMock } from '@freelbee/shared/mocks';
import { ReduxStoreMock } from '../../../tests/__mocks__/redux/ReduxStoreMock';

describe('Application form tests', () => {
  it('should show two errors if empty fields', () => {
    // given
    const { getByTestId, getAllByText } = render(<ReduxStoreMock><ApplicationModalForm /></ReduxStoreMock>, {wrapper: AppRouterMock});
    const submitBtn = getByTestId('landing-form-submit');

    // when
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field cannot be empty')).toHaveLength(3);
  });

  it('should show erron if invalid email', () => {
    // given
    const { getByTestId, getAllByText, queryByText } = render(<ReduxStoreMock><ApplicationModalForm /></ReduxStoreMock>, {wrapper: AppRouterMock});
    const submitBtn = getByTestId('landing-form-submit');
    const emailInput = getByTestId('landing-form-email');
    const messageInput = getByTestId('landing-form-message');
    const phoneInput = getByTestId('landing-form-phone');
    const nameInput = getByTestId('landing-form-name');
    const companyInput = getByTestId('landing-form-company');

    // when
    fireEvent.change(emailInput, {target: {value: 'wrong.com'}});
    fireEvent.change(phoneInput, {target: {value: '9990091213'}});
    fireEvent.change(companyInput, {target: {value: 'Test Company'}});
    fireEvent.change(nameInput, {target: {value: 'User Name'}});
    fireEvent.change(messageInput, {target: {value: 'Message text'}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('The field is filled in incorrectly!')).toHaveLength(1);
    expect(queryByText('The field cannot be empty')).toBeNull();
  });

  it('should send only corporate emails', () => {
    // given
    const { getByTestId, getAllByText} = render(<ReduxStoreMock><ApplicationModalForm /></ReduxStoreMock>, {wrapper: AppRouterMock});
    const submitBtn = getByTestId('landing-form-submit');
    const emailInput = getByTestId('landing-form-email');
    const messageInput = getByTestId('landing-form-message');
    const phoneInput = getByTestId('landing-form-phone');
    const nameInput = getByTestId('landing-form-name');
    const companyInput = getByTestId('landing-form-company');

    // when
    fireEvent.change(emailInput, {target: {value: 'user@gmail.com'}});
    fireEvent.change(phoneInput, {target: {value: '9990091213'}});
    fireEvent.change(companyInput, {target: {value: 'Test Company'}});
    fireEvent.change(nameInput, {target: {value: 'User Name'}});
    fireEvent.change(messageInput, {target: {value: 'Message text'}});
    fireEvent.click(submitBtn);

    // then
    expect(getAllByText('Please provide your corporate email, this email is not suitable')).toHaveLength(1);
  });

});
