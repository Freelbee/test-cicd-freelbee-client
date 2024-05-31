'use client';

import { Color, Draggable, mediaBreakpointDown, typography } from '@freelbee/shared/ui-kit';
import Link from 'next/link';
import { links } from './data/links';
import styled, { RuleSet } from 'styled-components';
import { HTMLAttributes, useId } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface Props extends HTMLAttributes<HTMLDivElement> {
    styles?: RuleSet<object>
}

const UNDERLINE_SPACE = 16;

export const SliderMenu = (props: Props) => {

    const pathName = usePathname();
    const isRouteActive = (link: string) => pathName.endsWith(link);
    const layoutId = useId();

    return (
        <Container $styles={props.styles} {...props}>
            <Draggable>
                {links.map(({Icon, title, link}) => (
                     <SelectItem
                        $active={isRouteActive(link)}
                        key={title}>
                            <LinkToPage href={link}>
                                <Icon />
                                {title}
                            </LinkToPage>
                        {isRouteActive(link) && 
                        <SelectedUnderLine
                            transition={{ 
                                type: "spring", 
                                bounce: 0.2,
                                duration: 0.9 }}
                            layoutId={layoutId} />}
                    </SelectItem>
                ))}
            </Draggable>            
        </Container>
    );
}

const LinkToPage = styled(Link)`
    ${typography.bodyMedium};
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
        stroke: currentColor;
        width: 20px;
        height: 20px;
    }
`

const Container = styled.div<{$styles?: RuleSet<object>}>`
    overflow: hidden;
    ${({$styles}) => $styles};
`

const SelectItem = styled(motion.div) <{ $active: boolean}>`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-bottom: ${UNDERLINE_SPACE + 1}px;
    transition: color 300ms;
    color: ${({$active}) => $active ? Color.BLUE : Color.GRAY_600};

    &:not(:last-child) {
      margin-right: 2rem;
    }

    ${mediaBreakpointDown(800)} {
        padding-bottom: ${UNDERLINE_SPACE + 2}px;
    }
`;

const SelectedUnderLine = styled(motion.span)`
    width: 100%;
    height: 1px;
    position: absolute;
    z-index: 1;
    bottom: 1px;
    left: 0;
    background: ${Color.BLUE};

    ${mediaBreakpointDown(800)} {
        bottom: 3px;
    }
`;