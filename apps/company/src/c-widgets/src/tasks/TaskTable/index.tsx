'use client';

import { css } from "styled-components";
import { TableHead, useTasksData } from '@company/entities';
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { TaskRow } from "./ui/TaskRow";
import { useEffect } from 'react';

export const TaskTable = () => {

  useEffect(() => {
    const str = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? '';
    const newStr = str.substring(0, 5) + '*' + str.substring(6);
    console.log(newStr);
  }, []);


  const [tasks] = useTasksData();

  return (
    <div>
      <TableHead styles={headRow}>
          <Text font='body' color={Color.GRAY_700}>ID</Text>
          <Text font='body' color={Color.GRAY_700}>Name</Text>
          <Text font='body' color={Color.GRAY_700}>Freelancer</Text>
          <Text font='body' color={Color.GRAY_700}>Amount</Text>
          <Text font='body' color={Color.GRAY_700}>Deadline</Text>
          <Text font='body' color={Color.GRAY_700}>Status</Text>
      </TableHead>
      {[...tasks]
        .sort((a, b) => b.taskId - a.taskId)
        .map(task => (
        <TaskRow key={task.taskId} task={task} />
      ))}
    </div>
  )
}

const headRow = css`
    display: grid;
    grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 0.9fr 128px;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
      display: none;
    }
`;
