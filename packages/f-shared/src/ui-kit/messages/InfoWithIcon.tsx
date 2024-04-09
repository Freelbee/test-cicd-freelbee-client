import styled from 'styled-components';
import { Breakpoint, Color } from '../style-base/enums/enums';
import { TypographyKeys, typography } from '../style-base/typography/golos/typography';
import { mediaBreakpointDown } from '../style-base/functions/functions';

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

export const InfoWithIcon = ({Icon, background = Color.BG_REPORTS_BLUE, textColor = Color.GRAY_800, children, fillIcon = false, strokeIcon = true, withPadding = true, align = 'center',iconSize = InfoIconSize.L, iconSizeMobile, font = 'bodySmall'}: Props) => (
    <Container 
        background={background} 
        textColor={textColor}
        fillIcon={fillIcon}
        strokeIcon={strokeIcon}
        withPadding={withPadding}
        align={align}
        size={iconSize}
        sizeMobile={iconSizeMobile}>
        {Icon && <Icon />}
        <Text font={font}>
            {children}
        </Text>
    </Container>
);

const Container = styled.div<{
    background: Color;
    textColor: Color;
    fillIcon: boolean;
    strokeIcon: boolean;
    withPadding?: boolean;
    align?: 'flex-start' | 'center';
    size: InfoIconSize;
    sizeMobile?: InfoIconSize;
}>`
    display: flex;
    gap: 8px;
    align-items:${({ align }) => align};
    border-radius: 8px;
    padding: ${({ withPadding }) => withPadding ? '10px 16px' : '0px'};
    color: ${({ textColor }) => textColor};
    background-color: ${({ background }) => background};

    svg {
        flex-shrink: 0;
        width: ${({size}) => size};
        height: ${({size}) => size};
        fill: ${({ textColor, fillIcon }) => fillIcon && textColor};
        path {
          stroke: ${({ textColor, strokeIcon }) => strokeIcon && textColor}; 
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            width: ${({size, sizeMobile}) => sizeMobile ? sizeMobile : size};
            height: ${({size, sizeMobile}) => sizeMobile ? sizeMobile : size};
        }
    }
`;

const Text = styled.div<{font: TypographyKeys}>`
    ${({font}) => typography[font]};
`;

