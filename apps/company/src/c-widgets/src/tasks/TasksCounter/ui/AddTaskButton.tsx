'use client';

import {Breakpoint, Button} from "@freelbee/shared/ui-kit";
import {css} from "styled-components";
import {setTaskCreationModalOpened, useGetCompanyCounterpartyQuery} from '@company/entities';
import {useDispatch} from 'react-redux';
import {CounterpartyStatus} from "@freelbee/entities";

export const AddTaskButton = () => {
  const dispatch = useDispatch();
  const {data: company} = useGetCompanyCounterpartyQuery();

  return (
    <Button
    disabled={!company || company.counterpartyDetail.status !== CounterpartyStatus.APPROVED}
    styles={btnStyles}
    onClick={() => dispatch(setTaskCreationModalOpened(true))}
    wideOnBreakPoint={Breakpoint.xMobile}
    isFit>Add task</Button>
  )
}

const btnStyles = css`
    align-self: flex-start;
    margin-left: auto;
`
