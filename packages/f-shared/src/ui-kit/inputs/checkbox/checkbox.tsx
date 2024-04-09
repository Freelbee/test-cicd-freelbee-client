'use client';

import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as CheckIcon} from '@freelbee/assets/icons/check/check.svg';

import { Color } from "@freelbee/shared/ui-kit";


export enum CheckboxStyle {
  LIGHT = 'light',
  DARK = 'dark'
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    checkColor?: Color,
    checkHoverColor?: Color,
    isCheck: boolean,
    isDisabled?: boolean,
    isIntermediate?: boolean,
    isError?: boolean,
    styleType?: CheckboxStyle
};

export const Checkbox = (props: Props) => {

    const {
        checkColor = Color.MINT,
        checkHoverColor = Color.EMERALD,
        styleType = CheckboxStyle.LIGHT,
        isCheck,
        onChange,
        isIntermediate,
        isError,
        disabled,
        onClick} = props;

    return (
        <CheckboxWrapper
            onClick={onClick}
            $checkColor={checkColor}
            $checkHoverColor={checkHoverColor}
            $isIntermediate={isIntermediate}
            $isError={isError}
            $type={styleType}>
            <input
                type="checkbox"
                checked={isCheck}
                onChange={onChange}
                disabled={disabled}/>
            {!isIntermediate && <CheckIcon />}
        </CheckboxWrapper>
    );
};

const CheckboxWrapper = styled.span<{
    $checkColor: Color,
    $checkHoverColor: Color,
    $isIntermediate?: boolean,
    $isError?: boolean,
    $type: CheckboxStyle
}>`
    --activeColor: ${({$checkColor}) => $checkColor};
    --hoverColor: ${({$checkHoverColor}) => $checkHoverColor};

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;

    input[type="checkbox"] {
        -webkit-appearance: none;
        appearance: none;

        width: 16px;
        height: 16px;
        margin: -3px;
        flex-shrink: 0;
        border: 1px solid ${({$isError}) => $isError ? Color.DANGER : Color.GRAY_600};
        border-radius: 4px;
        outline: none;
        transition: border 0.3s, background-color 0.3s;
        cursor: pointer;
        background-color: ${({$isError}) => $isError ? 'rgba(251, 118, 118, 0.2);' : 'transparent'};

        &+svg {
            pointer-events: none;
            position: absolute;
            flex-shrink: 0;
            z-index: 1;
            display: block;
            margin: auto;
            width: 16px;
            height: 16px;
            fill: ${({$type}) => $type === CheckboxStyle.LIGHT ? Color.WHITE : Color.GRAY_900};
            opacity: 0;
            visibility: hidden;
            transition: fill 0.3s, opacity 0.3s, visibility 0.3s;
        }

        &:focus {
            outline: 3px solid ${Color.GRAY_400};
            outline-offset: 0px;
            &:not(:focus-visible) {
                outline: none;
            }
        }

        &:checked {
            border: 1px solid var(--activeColor);
            background-color: var(--activeColor);

            &+svg {
                opacity: 1;
                visibility: visible;
            }
        }

        &:checked:hover {
            border: 1px solid var(--hoverColor);
            background-color: var(--hoverColor);
        }

        &:hover {
            border: 1px solid var(--activeColor);
        }

        &:disabled {
            pointer-events: none;
            border: 1px solid ${Color.GRAY_300};
            background-color: ${Color.GRAY_300};
        }

        &:disabled:checked {
            border: 1px solid ${Color.GRAY_400};
            background-color: ${Color.GRAY_400};

            &+svg {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    ${({$isIntermediate, $type}) => $isIntermediate && css`
        &::before {
            content: '';
            pointer-events: none;
            position: absolute;
            width: 8px;
            height: 2px;
            background-color: ${$type === CheckboxStyle.LIGHT ? Color.WHITE : Color.GRAY_900};
        }
    `}
`;
