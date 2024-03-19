'use client';

import styled from 'styled-components';

import { Breakpoint, mediaBreakpointDown } from '@freelbee/shared/ui-kit';

import { CountersData } from '../data/CountersData';

import { CounterCard } from './CounterCard';

export const CountersRow = () => (
    <Row>
        {CountersData.map((c, idx)=> (
            <CounterCard data={c} key={idx}/>
        ))}
    </Row>
);

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    justify-content: center;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        grid-template-columns: 1fr;
    }
`;
