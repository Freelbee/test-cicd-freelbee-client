'use client';

import { css } from "styled-components";
import { TableHead, useTasksData } from '@company/entities';
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { TaskRow } from "./ui/TaskRow";

export const TaskTable = () => {

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
      {tasks.map(task => (
        <TaskRow key={task.taskId} task={task} />
      ))}
    </div>
  )
}

const headRow = css`
    display: grid;
    grid-template-columns: 40px 2fr 1fr 0.8fr 0.8fr 0.8fr;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
      display: none;
    }
`;
