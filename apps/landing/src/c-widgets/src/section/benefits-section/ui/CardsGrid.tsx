'use client';

import { styled } from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

import { CARDS_DATA } from "../data/cardsData";

import { Card } from "./Card";

export const CardsGrid = () => (
    <Grid>
        {CARDS_DATA.map(card => (
            <Card {...card} key={card.title} />
        ))}
    </Grid>
);

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        margin-bottom: 24px;
        grid-template-columns: 1fr;
    }
`;
