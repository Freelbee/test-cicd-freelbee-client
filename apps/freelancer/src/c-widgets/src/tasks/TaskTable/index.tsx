'use client';

import { css } from "styled-components";
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { TableHead, useTasksData } from '@freelancer/entities';
import { TaskRow } from "./ui/TaskRow";

export const TaskTable = () => {

  const [tasks] = useTasksData();

  return (
    <div>
      <TableHead styles={headRow}>
          <Text font='body' color={Color.GRAY_700}>ID</Text>
          <Text font='body' color={Color.GRAY_700}>Name</Text>
          <Text font='body' color={Color.GRAY_700}>Company</Text>
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
