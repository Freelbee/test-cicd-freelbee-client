'use client';

import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { Breakpoint, Color, Heading3, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';
import { ReactComponent as Icon} from '@freelbee/assets/icons/cross-icons/plus.svg';


interface Props {
    title: string | React.ReactNode;
    children: React.ReactNode;
    id?: string;
    background?: Color;
}

export const Tab = ({title, children, id, background = Color.GRAY_200}: Props) => {

    const [opened, setOpened] = useState<boolean>(false);
    const tabRef = useRef<HTMLDivElement | null >(null);

    const toggleOpen = () => setOpened(prev => !prev);

    return (
        <TabContainer $bgColor={background} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <TabHead 
                onClick={toggleOpen}
                id={id} 
                ref={tabRef} 
                $isOpened={opened}>
                <Heading3 $styles={tabTitleText} itemProp="name">
                    {title}   
                </Heading3>
                <button 
                    aria-label={opened ? 'close tab' : 'open tab'}>
                    <Icon />
                </button>
                
            </TabHead>
            <TabContent itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" animate={{
                height: opened ? 'auto' : '0px',
            }}
            initial={false}>
                {children}
            </TabContent>
        </TabContainer>
    );
};

const TabContainer = styled.div<{$bgColor: Color}>`
   background-color: ${({$bgColor}) => $bgColor};
   padding: 32px 16px;
   border-bottom: 1px solid ${Color.GRAY_400};

   ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 16px 8px;
    }
`;

const TabHead = styled.div<{$isOpened: boolean}>`
    cursor: pointer;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

        button {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            overflow: hidden;
            background-color: ${Color.DEFAULT_BLUE};
            transition: background-color 0.5s;

            &:hover {
                background-color: ${Color.BLUE};
            }
        }

      svg {
            flex-shrink: 0;
            width: 60%;
            height: 60%;
            transition: fill 0.5s, transform 0.5s;
            fill: ${Color.WHITE};
            transform: ${({ $isOpened }) => !$isOpened ? 'rotate(0)' : 'rotate(-45deg)'};
        }
`;

const tabTitleText = css`
    max-width: ${vw(430)};
    margin-right: 24px;

    span {
        margin-right: 8px;
    }

    ${mediaBreakpointDown(Breakpoint.FHD)} {
        max-width: ${vw(430, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.Large)} {
        max-width: ${vw(430, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        max-width: ${vw(525, Breakpoint.Tablet)};
    }
`;

const TabContent = styled(motion.div)`
    overflow: hidden;
`;
