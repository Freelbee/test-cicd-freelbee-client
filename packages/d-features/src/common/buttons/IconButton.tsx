'use client';
import styled, {keyframes, RuleSet} from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { ReactComponent as LoadingIcon} from '@freelbee/assets/icons/loading/loading.svg';


import {
  appearenceByScale,
  appearenceOpacity,
  Breakpoint,
  Color,
  mediaBreakpointDown,
  activeButtonStyles,
  buttonStyles,
  ButtonStyleEnum
} from '@freelbee/shared/ui-kit';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    styles?: RuleSet<object>,
    isLoading?: boolean;
    Icon: JSX.Element;
    strokeIcon?: boolean;
    fillIcon?: boolean;
    styleType?: ButtonStyleEnum;
    isSmall?: boolean;
}

export function IconButton (props: Props) {

    const {
        isLoading,
        Icon,
        styleType = ButtonStyleEnum.BLACK,
        label,
        fillIcon = true,
        strokeIcon = false,
        disabled,
        ...rest
    } = props;

    return (
        <ButtonBody
            aria-label={label}
            $isLoading={isLoading}
            $styleType={styleType}
            $fillIcon={fillIcon}
            $strokeIcon={strokeIcon}
            disabled={disabled || isLoading}
            {...rest}
        >
            <AnimatePresence>
                {isLoading &&
                <ButtonLoader {...appearenceOpacity} $styleType={styleType}>
                    <LoadIconContainer {...appearenceByScale}>
                        <LoadingIcon/>
                    </LoadIconContainer>
                </ButtonLoader>}
            </AnimatePresence>
            {Icon}
        </ButtonBody>
    );
}

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }to{
     transform: rotate(360deg);
   }
`;

const LoadIconContainer = styled(motion.span)`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        flex-shrink: 0;
        fill: currentColor;
        stroke: transparent;
        animation: ${spin} 1s  infinite linear;
    }
`;

const ButtonLoader = styled(motion.span)<{
    $styleType: ButtonStyleEnum;
}>`
    ${({$styleType}) => activeButtonStyles[$styleType]};
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const ButtonBody = styled.button<{
    styles?: RuleSet<object>,
    $isLoading?: boolean,
    $styleType: ButtonStyleEnum;
    $strokeIcon: boolean;
    $fillIcon: boolean;
    $isSmall?: boolean;
}>`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: ${({$isSmall}) => $isSmall ? '10px' : '16px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  &:disabled {
    pointer-events: none;
    background-color: ${Color.GRAY_400};
    color: ${Color.WHITE};

    svg {
        filter: grayscale(100%);
    }
  }

    &:focus {
        outline: 3px solid ${Color.GRAY_400};
        outline-offset: 0px;
        &:not(:focus-visible) {
            outline: none;
        }
    }

  ${({$styleType}) => buttonStyles[$styleType]};
  ${({$isLoading, $styleType}) => $isLoading && activeButtonStyles[$styleType]};

  ${props => props.styles};

    svg {
        fill: ${({$fillIcon}) => $fillIcon && 'currentColor'};
        stroke: ${({$strokeIcon}) => $strokeIcon && 'currentColor'};
        flex-shrink: 0;
        width: 24px;
        height: 24px;
    }

  ${mediaBreakpointDown(Breakpoint.Large)} {
    padding: ${({$isSmall}) => !$isSmall && '14px'};

    svg {
        width: 18px;
        height: 18px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: ${({$isSmall}) => !$isSmall && '12px'};

    svg {
        width: 16px;
        height: 16px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    padding: 10px;

    svg {
        width: 14px;
        height: 14px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 8px;

    svg {
        width: 12px;
        height: 12px;
    }
  }
`;
