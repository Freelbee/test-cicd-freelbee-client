'use client';

import styled, { keyframes } from "styled-components";

interface Props<T> {
    items: Array<T>;
    renderSlide: (item: T) => JSX.Element;
    direction?: 'right' | 'left';
    speed?: number;
}

export function LoopSlider<T> ({items, renderSlide, direction = 'right', speed = 20}: Props<T>) {
    return (
        <SliderContainer>
            <SliderRow direction={direction} speed={speed}>
                {items.map(item => renderSlide(item))}
                {items.map(item => renderSlide(item))}
            </SliderRow>
        </SliderContainer>
    );
}

const move = keyframes`
    0% {
      transform: translate(0, 0);
    }
  100% {
      transform: translate(-50%, 0);
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;  
  height: 60px; 
  position:relative;
  user-select: none;
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0));
`;

const SliderRow = styled.div<{
    direction: 'right' | 'left';
    speed: number;
}>`
  will-change: transform;
  display: flex;
  position:absolute; 
  top:0px; 
  left:0px; 
  animation: ${move} linear infinite;
  animation-duration: ${({speed}) => `${speed}s`};
  animation-direction: ${({direction}) => direction === 'right' && 'reverse'};
`;