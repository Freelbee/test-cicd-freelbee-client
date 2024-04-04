'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link, { LinkProps } from 'next/link';
import styled, { css,RuleSet } from 'styled-components';
import { Breakpoint, Color, IconPosition, SquareButtonStyle, TypographyKeys, mediaBreakpointDown, squareButtonStyles, typography } from '@freelbee/shared/ui-kit';


type ButtonCustomProps = {
    children: React.ReactNode,
    styleType?: SquareButtonStyle;
    styles?: RuleSet<object>,
    Icon?: JSX.Element;
    strokeIcon?: boolean;
    fillIcon?: boolean;
    iconPosition?: IconPosition;
    font?: TypographyKeys;
    wideOnBreakPoint?: Breakpoint | number;
};

type AsButton = ButtonCustomProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonCustomProps> & {
    as: 'button'
};

type AsLink = Omit<LinkProps, 'href'> & ButtonCustomProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    as: 'Link',
    href: Url;
};

type AsAnchor = ButtonCustomProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonCustomProps> & {
    as: 'a'
};

type Props = AsButton | AsAnchor | AsLink;

const isLink = (props: Props): props is AsLink => props.as === 'Link';
const isAnchor = (props: Props): props is AsAnchor => props.as === 'a';

export function SquareButton (props: Props) {

    if (isLink(props)) {
        const {
            children,
            Icon,
            iconPosition = IconPosition.LEFT,
            fillIcon = false,
            strokeIcon = true,
            font = 'body',
            as,
            styleType = SquareButtonStyle.STROKE_BLACK,
            wideOnBreakPoint,
            ...rest
        } = props;

        return (
            <Link {...rest}>
                <ButtonBody 
                    as='span'
                    $wideOnBreakPoint={wideOnBreakPoint}
                    $fillIcon={fillIcon}
                    $strokeIcon={strokeIcon}
                    $style={styleType}
                    $font={font}>
                    {iconPosition === IconPosition.LEFT && Icon}
                    {children}
                    {iconPosition === IconPosition.RIGHT && Icon} 
                </ButtonBody>
            </Link>
        );
    }

    if (isAnchor(props)) {
        const {
            children,
            Icon,
            iconPosition = IconPosition.LEFT,
            styleType = SquareButtonStyle.STROKE_BLACK,
            fillIcon = false,
            strokeIcon = true,
            wideOnBreakPoint,
            font = 'body',
            as,
            ...rest
        } = props;

        return (
            <ButtonBody
                as='a'
                $fillIcon={fillIcon}
                $strokeIcon={strokeIcon}
                $style={styleType}
                $wideOnBreakPoint={wideOnBreakPoint}
                $font={font}
                {...rest}>
                {iconPosition === IconPosition.LEFT && Icon}
                {children}
                {iconPosition === IconPosition.RIGHT && Icon}
            </ButtonBody>
        );
    }
    
    const {
        children,
        Icon,
        iconPosition = IconPosition.LEFT,
        styleType = SquareButtonStyle.STROKE_BLACK,
        fillIcon = false,
        strokeIcon = true,
        wideOnBreakPoint,
        font = 'body',
        ...rest
    } = props;

    return (
        <ButtonBody
            $fillIcon={fillIcon}
            $strokeIcon={strokeIcon}
            $style={styleType}
            $font={font}
            $wideOnBreakPoint={wideOnBreakPoint}
            {...rest}>
            {iconPosition === IconPosition.LEFT && Icon}
            {children}
            {iconPosition === IconPosition.RIGHT && Icon}
        </ButtonBody>
    );
};

const ButtonBody = styled.button<{
    styles?: RuleSet<object>,
    $style: SquareButtonStyle;
    $strokeIcon: boolean;
    $fillIcon: boolean;
    $font: TypographyKeys;
    $wideOnBreakPoint?: Breakpoint
}>`
  ${({$font}) => typography[$font]};
  ${({$style}) => squareButtonStyles[$style]};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  transition: color 0.5s,  background-color 0.5s, border 0.5s;

    &:focus {
        outline-color: ${Color.GRAY_400};
        &:not(:focus-visible) {
            outline: none;
        }
    }
 
  &:disabled {
    pointer-events: none;
    color: ${Color.GRAY_500};
    background-color: ${Color.GRAY_200};

    svg {
        filter: grayscale(100%);
    }
  }

    svg {
        fill: ${({$fillIcon}) => $fillIcon && 'currentColor'};
        stroke: ${({$strokeIcon}) => $strokeIcon && 'currentColor'};
        flex-shrink: 0;
        width: 24px;
        height: 24px;

        transition: fill 0.5s, stroke 0.5s;
    }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    svg {
        width: 22px;
        height: 22px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    gap: 8px;

    svg {
        width: 20px;
        height: 20px;
    }
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    gap: 6px;
    padding: 14px;

    svg {
        width: 18px;
        height: 18px;
    }
  }

  ${({$wideOnBreakPoint}) => $wideOnBreakPoint && 
    css`
    ${mediaBreakpointDown($wideOnBreakPoint)} {
        width: 100%;
    }
` };

  ${props => props.styles};
`;