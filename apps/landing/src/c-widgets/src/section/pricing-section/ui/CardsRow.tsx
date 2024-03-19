'use client';

import { styled } from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

import { CardsData } from "../data/CardsData";

import { Card } from "./Card";

export const CardsRow = () => (
    <Row>
        {CardsData.map(card => (
            <Card card={card} key={card.title}/>
        ))}
    </Row>
);

const Row = styled.div`
    margin: 0  auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        gap: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        gap: 16px;
        grid-template-columns: 1fr;
        place-items: center;
    }
`;
