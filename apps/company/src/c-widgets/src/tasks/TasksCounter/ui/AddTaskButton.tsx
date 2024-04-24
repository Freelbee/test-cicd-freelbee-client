'use client';

import { Button } from "@freelbee/shared/ui-kit";
import { css } from "styled-components";
import { setTaskCreationModalOpened } from '@company/entities';
import { useDispatch } from 'react-redux';

export const AddTaskButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
    styles={btnStyles}
    onClick={() => dispatch(setTaskCreationModalOpened(true))}
    isFit>Add task</Button>
  )
}

const btnStyles = css`
    align-self: flex-start;
    margin-left: auto;
`
