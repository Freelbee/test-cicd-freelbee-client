'use client';

import { Button } from "@freelbee/shared/ui-kit";
import { css } from "styled-components";

export const AddTaskButton = () => {

  return (
    <Button 
    styles={btnStyles}
    onClick={() => {}}
    isFit>Add task</Button>
  )
}

const btnStyles = css`
    align-self: flex-start;
    margin-left: auto;
`