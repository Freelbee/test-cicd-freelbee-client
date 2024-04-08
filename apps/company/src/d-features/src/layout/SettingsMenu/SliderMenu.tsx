'use client';

import { Color, typography } from '@freelbee/shared/ui-kit';
import Link from 'next/link';
import { links } from './data/links';
import styled, { RuleSet } from 'styled-components';
import { HTMLAttributes } from 'react';
import { NavLink } from "@freelbee/shared/ui-kit";
import TabsSelect from 'packages/f-shared/src/ui-kit/select/TabsSelect/TabsSelect';

interface Props extends HTMLAttributes<HTMLDivElement> {
    styles?: RuleSet<object>
}

export const SliderMenu = (props: Props) => {

    const renderStatus = ({Icon, title, link}: NavLink) => {
        return <Link href={link}>
                <LinkToPage>
                    <Icon />
                    {title}
                </LinkToPage>
            </Link>;
    };

    return (
        <Container $styles={props.styles} {...props}>
        <TabsSelect<NavLink>
            selectedColor={Color.BLUE}
            underlineColor={Color.BLUE}
            onSelect={() => { } }
            listItemRender={renderStatus}
            items={links} 
            defaultValue={links[0]}/>               
        </Container>
    );
}

const LinkToPage = styled.div`
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