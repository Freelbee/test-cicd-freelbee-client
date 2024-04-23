import styled from 'styled-components';
import { Breakpoint, Color } from '../style-base/enums/enums';
import { TypographyKeys, typography } from '../style-base/typography/golos/typography';
import { mediaBreakpointDown } from '../style-base/functions/functions';
import { useCallback, useState } from 'react';
import { ReactComponent as ArrowIcon } from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';

export enum InfoIconSize {
    'XS' = '14px',
    'S' = '16px',
    'M' = '18px',
    'L' = '20px',
}

interface Props {
    background?: Color;
    textColor?: Color;
    Icon?: React.FC;
    align?: 'flex-start' | 'center';
    fillIcon?: boolean;
    strokeIcon?: boolean;
    children: React.ReactNode;
    withPadding?: boolean;
    iconSize?: InfoIconSize;
    iconSizeMobile?: InfoIconSize;
    font?: TypographyKeys
}

export const InfoWithIcon = (props: Props) => {
    const {Icon, background = Color.BG_REPORTS_BLUE, textColor = Color.GRAY_800, children, fillIcon = false, strokeIcon = true, withPadding = true, align = 'center',iconSize = InfoIconSize.L, iconSizeMobile, font = 'bodySmall'} = props;

    const [isExpandable, setExpandable] = useState(false);
    const [isExpanded, setExpanded] = useState(false);

    const handleContainerRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            const height = node.offsetHeight;
            setExpandable(height > 70);
        }
    }, [children]);

    return (
        <Container
            background={background}
            $textColor={textColor}
            $fillIcon={fillIcon}
            $strokeIcon={strokeIcon}
            $withPadding={withPadding}
            align={align}
            size={iconSize}
            $sizeMobile={iconSizeMobile}
            $isExpandable={isExpandable}
            onClick={() => isExpandable && setExpanded(!isExpanded)}
        >
            {Icon && <Icon />}
            <TextContainer $isExpanded={isExpanded}><Text font={font} ref={handleContainerRef}>{children}</Text></TextContainer>
            {isExpandable && <ArrowContainer $isExpanded={isExpanded} isDisabled={false}><ArrowIcon/></ArrowContainer>}
        </Container>
    );
}

const Container = styled.div<{
    background: Color;
    $textColor: Color;
    $fillIcon: boolean;
    $strokeIcon: boolean;
    $withPadding?: boolean;
    align?: 'flex-start' | 'center';
    size: InfoIconSize;
    $sizeMobile?: InfoIconSize;
    $isExpandable: boolean;
}>`
    display: flex;
    gap: 8px;
    align-items:${({ align }) => align};
    border-radius: 8px;
    padding: ${({ $withPadding }) => $withPadding ? '10px 16px' : '0px'};
    color: ${({ $textColor }) => $textColor};
    background-color: ${({ background }) => background};
    cursor: ${({ $isExpandable }) => ($isExpandable && 'pointer')};

    svg {
        flex-shrink: 0;
        width: ${({size}) => size};
        height: ${({size}) => size};
        fill: ${({ $textColor, $fillIcon }) => $fillIcon && $textColor};
        path {
          stroke: ${({ $textColor, $strokeIcon }) => $strokeIcon && $textColor};
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            width: ${({size, $sizeMobile}) => $sizeMobile ? $sizeMobile : size};
            height: ${({size, $sizeMobile}) => $sizeMobile ? $sizeMobile : size};
        }
    }
`;

const TextContainer = styled.div<{ $isExpanded?: boolean }>`
    max-height: ${({ $isExpanded }) => ($isExpanded ? '1000px' : '2.75em')};
    overflow: hidden;
    transition: max-height 1s ease-out;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        max-height: ${({ $isExpanded }) => ($isExpanded ? '1000px' : '2.5em')};
    }
`;

const Text = styled.div<{font: TypographyKeys}>`
    ${({font}) => typography[font]};
`;

const ArrowContainer = styled.div<{ $isExpanded: boolean, isDisabled: boolean }>`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scaleY(${({$isExpanded}) => $isExpanded ? -1 : 1});
    transition: transform 0.5s;

    svg {
        width: 12px;
        height: 12px;
    }
`;
