'use client';

import {ReactNode, useEffect, useState} from 'react';
import { hiddenMenuItems } from '../data/links';
import { LowerPanelLink } from './LowerPanelLink';
import { DOMHelper } from '@freelbee/shared/helpers';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Color } from '@freelbee/shared/ui-kit';

interface Props {
    isOpen: boolean, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, additionalComponent?: ReactNode
}

export function LowerMenu (
    {isOpen, setIsOpen, additionalComponent}: Props) {

    const [touchStart, setTouchStart] = useState<number>();
    const [touchEnd, setTouchEnd] = useState<number>();
    const [dif, setDif] = useState(0);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
        setTouchEnd(undefined);
        setTouchStart(e.targetTouches[0].clientY);

    };

    const onTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
        setTouchEnd(e.targetTouches[0].clientY);
        if(touchStart && touchStart - e.targetTouches[0].clientY < 0)
            setDif(touchStart - e.targetTouches[0].clientY);
    };

    useEffect(()=>{
        if(!isOpen) {
            setTimeout(()=>{
                setDif(0);
            }, 500);
        }
        return () => {
            setDif(0);
        };
    }, [isOpen]);


    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isTopSwipe = distance > minSwipeDistance;
        const isBottomSwipe = distance < -minSwipeDistance;
        if (isTopSwipe || isBottomSwipe) {
            if(!isTopSwipe)
                setIsOpen(false);
        }
    };

    const links = hiddenMenuItems.map((item, i) => (
        <LowerPanelLink 
            key={i} 
            link={item.link}
            text={item.title}
            Icon={item.Icon} />));

    return (
        <>
            <LowerPanel
                $isOpen={isOpen} 
                onClick={(e)=> DOMHelper.isNotChildOfElem(e) && setIsOpen(false)}>
                <LowerPanelContainer
                    style={{bottom: `${dif < 0 ? dif : 0}px`}}
                    onTouchStart={(e)=>onTouchStart(e)}
                    onTouchMove={(e)=>onTouchMove(e)}
                    onTouchEnd={onTouchEnd}
                    $isOpen={isOpen}
                >
                    {additionalComponent}
                            <LowerPanelLinks>
                                {links}
                            </LowerPanelLinks>                    
                </LowerPanelContainer>

            </LowerPanel>

        </>
    );
}

const animation = keyframes`
 100% {
    background: #00000087;
  }
`;

const LowerPanel = styled.nav<{$isOpen: boolean}>`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  left: 0;
  top: 0;
  transition: opacity 0.5s, visibility 0.5s;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  ${({$isOpen}) => $isOpen && css`
    animation: ${animation} .5s;
    animation-delay: .1s;
    animation-fill-mode: forwards;
  `}
`;

const LowerPanelContainer = styled.div<{$isOpen?: boolean}>`
  min-height: 240px;
  display: flex;
  position: relative;
  background: #FFFFFF;
  border-radius: 20px 20px 0px 0px;
  padding: 16px 20px 32px 20px;
  align-items: flex-start;
  height: auto;
  width: 100%;
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.5s;

  &:before{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    content: "";
    background: ${Color.GRAY_400};
    border-radius: 20px;
    width: 64px;
    height: 4px;
  }
`;

const LowerPanelLinks = styled(motion.div)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  margin-top: 20px;
`;
