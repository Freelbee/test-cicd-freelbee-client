'use client';

import { Suspense } from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo} from '@freelbee/assets/icons/logo/freelbee-icon.svg';

import { Breakpoint, mediaBreakpointDown, Text, Title1} from '@freelbee/shared/ui-kit';
import { ReactComponent as ListIcon }from '../assets/icon.svg';
import { INSIDE_LIST } from '../data/list';

import { ActionButton } from './ActionButton';

export const TextContent = () => (
    <div>
        <Title>
            <Title1 as='h2'>Inside <span><Logo />Freelbee</span></Title1>
        </Title>

        <List>
            {INSIDE_LIST.map((item, idx) => <li key={idx}><ListIcon/><Text font='body'>{item}</Text></li>)}
        </List>
        <Suspense fallback={<></>}>
            <ActionButton />
        </Suspense>

    </div>
);


const Title = styled.div`
  h2 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;

    span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
      justify-content: center;
    }
  }
  svg {
    width: 40px;
    height: 40px;
  }
`;

const List = styled.ul`
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding-bottom: 16px;

    svg {
      flex-shrink: 0;
    }
  }
`;
