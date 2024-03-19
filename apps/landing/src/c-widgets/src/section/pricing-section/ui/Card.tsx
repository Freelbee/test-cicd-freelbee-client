'use client';

import { Suspense } from "react";
import styled from "styled-components";

import { Text, Breakpoint, Color, mediaBreakpointDown, typography } from "@freelbee/shared/ui-kit";

import { CompareCard } from "../interface/CompareCard";

interface Props {
    card: CompareCard
}

export const Card = ({card}: Props) => (
    <Container>
        <Header $disabled={card.disabled}>
            {card.title}
        </Header>

        <Content>
            <IconContainer>
                {card.Icon}
            </IconContainer>

            <PriceRow>
                <div>
                    <Text font='body' as='p'>Monthly fee from</Text>
                    <Text font='captions' color={Color.GRAY_600} as='p'>per contractor</Text>
                </div>

                {card.monthlyPrice}
            </PriceRow>

            <PriceRow>
                <div>
                    <Text font='body' as='p'>Transaction fee</Text>
                    <Text font='captions' color={Color.GRAY_600} as='p'>per contractor</Text>
                </div>

                {card.transactionPrice}
            </PriceRow>
            <Suspense fallback={<></>}>
                {card.button}
            </Suspense>
        </Content>
    </Container>
);

const Container = styled.div`
    position: relative;
    border-radius: 20px;
    background-color: ${Color.WHITE};
    max-width: 574px;
    padding-top: 3.5em;


    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        width: 100%;
    }
`;

const Content = styled.div`
    height: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 20px;
    justify-content: space-between;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        gap: 24px;
        padding: 24px;
    }
`;

const IconContainer = styled.div`
    width: 147px;
    margin-right: auto;

    svg {
        height: 100%;
        width: 100%;
    }
`;

const Header = styled.div<{$disabled?: boolean}>`
    ${typography.heading1};
    position: absolute;
    top: 0;
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 0.6em 1em;
    color: ${Color.WHITE};
    background-color: ${({$disabled}) => $disabled ? Color.GRAY_400 : Color.BLUE};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
