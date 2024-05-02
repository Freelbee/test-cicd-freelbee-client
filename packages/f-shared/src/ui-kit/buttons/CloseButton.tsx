'use client';

import styled, { RuleSet } from 'styled-components';

import { ReactComponent as CloseIcon} from '@freelbee/assets/icons/cross-icons/close-icon.svg';
import { Color } from '@freelbee/shared/ui-kit';

interface Props {
    color?: Color;
    hoverColor?: Color;
    size?: CloseBtnSize;
    style?: React.CSSProperties;
    disabled?: boolean;
    clickHandler: (args: unknown) => void;
    label?: string;
    styles?: RuleSet<object>;
}

export enum CloseBtnSize {
    XS = '18px',
    S = '20px',
    M = '24px',
    L = '28px',
}

export const CloseButton = ({
    color = Color.GRAY_500,
    hoverColor = Color.GRAY_600,
    size = CloseBtnSize.S,
    disabled = false,
    style = {},
    clickHandler,
    label = 'Close',
    styles}: Props) => (
    <Button
        $styles={styles}
        type='button'
        onClick={clickHandler}
        $size={size}
        $color={color}
        $hoverColor={hoverColor}
        disabled={disabled}
        style={style}
        aria-label={label}>
        <CloseIcon />
    </Button>
);

const Button = styled.button<{$color: Color, $hoverColor: Color, $size: CloseBtnSize, $styles?: RuleSet<object>}>`
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    cursor: pointer;

    svg {
        width: 100%;
        height: 100%;
        stroke: ${({ $color }) => $color};
        transition: stroke 0.5s;
    }

    &:hover {
        svg {
            stroke: ${({ $hoverColor }) => $hoverColor};
        }
    }

    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &:focus {
        outline: 3px solid ${Color.GRAY_400};
        outline-offset: 0px;
        &:not(:focus-visible) {
            outline: none;
        }
    }
    ${({$styles}) => $styles};
`;
