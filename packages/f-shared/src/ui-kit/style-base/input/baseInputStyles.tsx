'use client'

import { css } from 'styled-components';

import {typography} from '../typography/golos/typography'
import {Color} from '../enums/enums'

export const baseInputStyles = css<{$isError?: boolean, $isValid?: boolean}>`
  ${typography.body};
  color: ${Color.GRAY_800};
  height: 48px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_400};
  transition: 0.3s border;

  &::placeholder {
    color: ${Color.GRAY_500};
  }

  &:hover {
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_600};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.BLUE};
  }

  &:disabled {
    border: 1px solid ${Color.GRAY_400};
  }
`;
