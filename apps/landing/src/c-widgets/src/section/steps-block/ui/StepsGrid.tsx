'use client';

import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

import { stepsData } from "../data/stepsData";

import { StepCard } from "./StepCard";

export const StepsGrid = () => (
    <Grid>
        {stepsData.map(step => <StepCard data={step} key={step.title} />)}
    </Grid>
);

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        grid-template-columns: 1fr;
    }
`;
