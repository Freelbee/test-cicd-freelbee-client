'use client';

import { forwardRef, useEffect, useRef, useState} from 'react';
import styled, {css, keyframes, RuleSet} from 'styled-components';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import { ReactComponent as SuccessIcon} from '@freelbee/assets/icons/check/done.svg';
import { ReactComponent as LoadingIcon } from '@freelbee/assets/icons/loading/loading.svg';


import {
  activeButtonStyles,
  appearenceByScale,
  Breakpoint,
  Color,
  buttonStyles,
  mediaBreakpointDown,
  typography,
  ButtonStyleEnum,
  IconPosition
} from '@freelbee/shared/ui-kit';



const PULSE_SIZE = 50;
const SUCCESS_DELAY = 2000;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    styles?: RuleSet<object>,
    isLoading?: boolean;
    Icon?: JSX.Element;
    strokeIcon?: boolean;
    fillIcon?: boolean;
    iconPosition?: IconPosition;
    isSmallHeight?: boolean;
    isWide?: boolean;
    isFit?: boolean;
    isSuccess?: boolean;
    wideOnBreakPoint?: Breakpoint | number;
    styleType?: ButtonStyleEnum;
}

export const Button = forwardRef(function Button (props: Props, ref?: React.ForwardedRef<HTMLButtonElement>) {

    const {
        children,
        isLoading,
        Icon,
        styleType = ButtonStyleEnum.BLACK,
        iconPosition = IconPosition.LEFT,
        fillIcon = true,
        strokeIcon = false,
        onPointerDown,
        isFit,
        isSmallHeight,
        isWide,
        wideOnBreakPoint,
        isSuccess = false,
        disabled,
        ...rest
    } = props;

    const controls = useAnimationControls();
    const pulseRef = useRef<HTMLSpanElement | null>(null);
    const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

    const handlePointerDown: React.PointerEventHandler<HTMLButtonElement> = (e) => {
        if(onPointerDown) {
            onPointerDown(e);
        }
        if(!pulseRef.current) return;

        const {clientX, clientY} = e;
        const {top, left} = e.currentTarget.getBoundingClientRect();

        pulseRef.current.style.top = clientY - top - (PULSE_SIZE / 2) + 'px';
        pulseRef.current.style.left = clientX - left - (PULSE_SIZE / 2) + 'px';

        controls.start({
            opacity: [0, 0.3, 0],
            transform: ["scale(0)", "scale(2.5)", "scale(5)"],
            transition: {duration: 1}
        });
    };

    useEffect(() => {
        if(isSuccess) {
            setDisplaySuccess(true);
            setTimeout(() => setDisplaySuccess(false), SUCCESS_DELAY);
        }

    }, [isSuccess]);

    const getButtonHeight = () => {
        const height = pulseRef.current?.closest('button')?.offsetHeight;
        return height ? height + 'px' : '2.5em';
    };

    return (
        <ButtonBody
            $isLoading={isLoading}
            $styleType={styleType}
            $fillIcon={fillIcon}
            $strokeIcon={strokeIcon}
            $isFit={isFit}
            $isWide={isWide}
            $isSmallHeight={isSmallHeight}
            $wideOnBreakPoint={wideOnBreakPoint}
            $isSuccess={isSuccess}
            disabled={disabled || isLoading}
            {...rest}
            ref={ref}
            onPointerDown={handlePointerDown}
        >

            <Pulse
                initial={false}
                ref={pulseRef}
                animate={controls} />

            <AnimatePresence>
                {(isLoading || displaySuccess) &&
                <ButtonLoader
                    key='loader'
                    initial={{
                        opacity: 1,
                        scale: 1,
                    }}
                    animate={{
                        width: displaySuccess ? getButtonHeight() : '100%',
                        scale: displaySuccess ? 0.9 : 1,
                        opacity: (displaySuccess || isLoading) ? 1 : 0
                    }}
                    exit={{
                        opacity: 0,
                        width: '2em',
                        scale: 1,
                    }}
                    transition={{ type: "spring", stiffness: 40}}
                    $styleType={styleType}>
                    {displaySuccess &&
                        <SuccessIconContainer {...appearenceByScale} key='success'>
                            <SuccessIcon/>
                        </SuccessIconContainer>}
                    {isLoading &&
                        <LoadIconContainer {...appearenceByScale} key='load'>
                            <LoadingIcon/>
                        </LoadIconContainer>}
                </ButtonLoader>}
            </AnimatePresence>

            <ButtonContent $isHidden={displaySuccess || isLoading}>
                {iconPosition === IconPosition.LEFT && Icon}
                {children}
                {iconPosition === IconPosition.RIGHT && Icon}
            </ButtonContent>
        </ButtonBody>
    );
});

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }to{
     transform: rotate(360deg);
   }
`;

const drawDone = keyframes`
  from{
    stroke-dashoffset: 50px;
  }to{
     stroke-dashoffset: 0px;
   }
`;

const Pulse = styled(motion.span)`
    position: absolute;
    width: ${PULSE_SIZE + 'px'};
    height: ${PULSE_SIZE + 'px'};
    border-radius: 50%;
    background: var(--pulse-gradient);
    display: block;
    z-index: 2;
    opacity: 0;
    transform: scale(0);
`;

const ButtonLoader = styled(motion.span)<{
    $styleType: ButtonStyleEnum;
}>`
    ${({$styleType}) => activeButtonStyles[$styleType]};
    position: absolute;
    margin: auto;
    height: 100%;
    z-index: 1;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;

const ButtonBody = styled.button<{
    styles?: RuleSet<object>,
    $isLoading?: boolean,
    $isWide?: boolean;
    $isFit?: boolean;
    $wideOnBreakPoint?: Breakpoint;
    $styleType: ButtonStyleEnum;
    $strokeIcon: boolean;
    $fillIcon: boolean;
    $isSmallHeight?: boolean;
    $isSuccess?: boolean;
}>`
  ${typography.bodyMedium};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: ${({$isWide}) => $isWide ? '100%' : 'fit-content'};
  min-width: ${({$isFit}) => $isFit ? 'fit-content' : '212px'};
  padding: ${({$isSmallHeight}) => $isSmallHeight ? '8px 16px' : '14px 24px'};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  ${({$wideOnBreakPoint}) => $wideOnBreakPoint &&
    css`
        ${mediaBreakpointDown($wideOnBreakPoint)} {
            width: 100%;
        }
    ` };

  &:disabled {
    pointer-events: none;
    background-color: ${Color.GRAY_400};
    color: ${Color.WHITE};

    svg {
        filter: grayscale(100%);
    }
  }

    &:focus {
        outline-color: 3px solid ${Color.GRAY_400};
        outline-offset: 0px;
        &:not(:focus-visible) {
            outline: none;
        }
    }

  ${({$styleType}) => buttonStyles[$styleType]};
  ${({$isLoading, $styleType}) => $isLoading && activeButtonStyles[$styleType]};

    svg {
        fill: ${({$fillIcon}) => $fillIcon && 'var(--icon);'};
        stroke: ${({$strokeIcon}) => $strokeIcon && 'var(--icon);'};
        flex-shrink: 0;
        width: 18px;
        height: 18px;
    }

  ${mediaBreakpointDown(Breakpoint.Large)} {
    padding: ${({$isSmallHeight}) => $isSmallHeight ? '8px 16px' : '12px 20px'};
    min-width: ${({$isFit}) => $isFit ? 'fit-content' : '180px'};
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    min-width: ${({$isFit}) => $isFit ? 'fit-content' : '150px'};
    padding: ${({$isSmallHeight}) => $isSmallHeight ? '8px 16px' : '10px 20px'};
    min-width: 150px;

    svg {
        width: 16px;
        height: 16px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    padding: 8px 12px;
    min-width: ${({$isFit}) => $isFit ? 'fit-content' : '146px'};
    gap: 8px;

    svg {
        width: 14px;
        height: 14px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    min-width: ${({$isFit}) => $isFit ? 'fit-content' : '132px'};

    svg {
        width: 12px;
        height: 12px;
    }
  }

  ${props => props.styles};
`;

const LoadIconContainer = styled(motion.span)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;

    svg {
        flex-shrink: 0;
        fill: var(--icon);
        stroke: transparent;
        width: 100%;
        height: 100%;
        animation: ${spin} 1s infinite linear;
    }
`;

const ButtonContent = styled.span<{$isHidden?: boolean}>`
    opacity: ${({$isHidden}) => $isHidden ? 0 : 1};
    visibility: ${({$isHidden}) => $isHidden ? 'hidden' : 'visible'};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: opacity 0.5s, visibility 0.5s;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        gap: 8px;
    }
`;

const SuccessIconContainer = styled(motion.span)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;

    svg {
        flex-shrink: 0;
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;
        stroke: var(--icon);
        stroke-width: 3px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 50px;
        fill: none;
        animation: ${drawDone} 1s ease .5s backwards;
    }
`;
