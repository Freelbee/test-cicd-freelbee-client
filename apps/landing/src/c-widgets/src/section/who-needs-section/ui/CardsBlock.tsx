'use client';

import { Breakpoint, Color, Heading2, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import Image from 'next/image';
import styled from 'styled-components';

import chartsSrc from "@landing/assets/images/main/who-needs/charts.svg"
import financeSrc from "@landing/assets/images/main/who-needs/finance.svg"
import tasksSrc from "@landing/assets/images/main/who-needs/tasks.svg"


export const CardsBlock = () => (
    <Cards>
        <Card>
            <UpperText>
                <Heading2 as='p'>
                    CEOs and C-suite
                </Heading2>
                <Text
                    as='p'
                    font='body'
                    color={Color.GRAY_800}>
                    Reduce operational expenses to unlock new business prospects.
                </Text>
            </UpperText>

            <ImageWrapper>
                <Image fill src={chartsSrc} alt='image' />
            </ImageWrapper>

            <Text
                as='p'
                font='body'
                color={Color.GRAY_800}>
                Reduce operational expenses to unlock new business prospects.
            </Text>
        </Card>
        <Card>
            <UpperText>
                <Heading2 as='p'>
                    Financial Directors and Accountants
                </Heading2>
                <Text
                    as='p'
                    font='body'
                    color={Color.GRAY_800}>
                    Streamline contractor payments and paperwork to free up your time
                </Text>
            </UpperText>

            <ImageWrapper>
                <Image fill src={financeSrc} alt='image' />
            </ImageWrapper>

            <Text
                as='p'
                font='body'
                color={Color.GRAY_800}>
                Streamline contractor payments and paperwork to free up your time
            </Text>
        </Card>
        <Card>
            <UpperText>
                <Heading2 as='p'>
                    Project Managers and Team Leaders
                </Heading2>
                <Text
                    as='p'
                    font='body'
                    color={Color.GRAY_800}>
                    Take control of project timelines by significantly reducing payment bottlenecks
                </Text>
            </UpperText>

            <ImageWrapper>
                <Image fill src={tasksSrc} alt='image' />
            </ImageWrapper>

            <Text
                as='p'
                font='body'
                color={Color.GRAY_800}>
                Take control of project timelines by significantly reducing payment bottlenecks
            </Text>
        </Card>

    </Cards>
);

const Cards = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 1280px) {
    gap: 10px;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  
`;

const Card = styled.div`
  display: grid;
  border-radius: 20px;
  grid-template-rows: 54px 314px auto;
  justify-content: center;
  gap: 24px;
  padding: 32px;
  max-width: 380px;
  width: 100%;
  background: ${Color.WHITE};
  
  @media (max-width: 1280px) and (min-width: 600px) {
    gap: 64px;
    width: 100%;
    max-width: 720px;    
    grid-template-columns: 1fr 316px;
    grid-template-rows: unset;
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    gap: 24px;
    padding: 16px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-template-rows: 40px 314px auto;
    padding: 14px;
    gap: 8px;
  }

  p:last-child {
    padding-top: 20px;

    @media (max-width: 1280px) and (min-width: 600px) {
      display: none;
    }
  }
`;

const UpperText = styled.div`
    p:last-child {
      display: none;

      @media (max-width: 1280px) and (min-width: 600px) {
        display: block;
    }
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    height: 312px;
    width: 316px;
    border-radius: 16px;
    box-shadow: 0px 2.34074px 8.77778px rgba(0, 0, 0, 0.1);

    img {
        object-fit: contain;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 100%;
    }
`;