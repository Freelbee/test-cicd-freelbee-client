import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { ColorType } from '@admin/shared';
import { InputSize } from './InputSize';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string,
  className?: string,
  disabled?: boolean,
  size?: InputSize
}

export function Input(props: Props) {
  const { name = '', size = InputSize.Large, ...otherProps } = props;

  return (
    <Container
      {...otherProps}
      size={size}
      name={name}
      isDisabled={!!otherProps.disabled}
      // onChange={(e) => onChange(e.target.value)}
    />
  );
}

const Container = styled.input<{ isDisabled: boolean, size: number }>`
  color: ${ColorType.BLACK_COLOR};
  font-weight: 400;
  border-radius: 10px;
  border: 1px solid ${ColorType.B_COLOR};
  width: 100%;
  transition: 0.2s border;
  font-size: 14px;
  height: ${({ size }) => size}px;
  padding: 15px;

  &::placeholder {
    color: ${ColorType.GREY_COLOR};
    font-size: 13px;
  }

  &::-webkit-input-placeholder {
    color: ${ColorType.GREY_COLOR};
    font-size: 13px;
  }

  &:hover {
    border: 1px solid ${ColorType.GREY_COLOR};
  }

  &:focus {
    outline: none;
    border: 1px solid ${ColorType.GREY_COLOR};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }

  ${({ isDisabled }) =>
    isDisabled && `
      background-color: #fafafa !important;
      cursor: not-allowed !important;
      &:hover {
        border: 1px solid $light-grey-color;
      }
   `}
`;
