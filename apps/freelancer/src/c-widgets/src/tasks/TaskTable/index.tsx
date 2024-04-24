'use client';

import { css } from "styled-components";
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { TaskCounterpartyDataDto, TaskStatus } from "@freelbee/entities";
import { TableHead } from "@freelancer/entities";
import { TaskRow } from "./ui/TaskRow";

export const TaskTable = () => {

  // MOCK
  const tasks: TaskCounterpartyDataDto[] = [
    {
      "id": 1,
      "taskId": 1,
      "title": "Develop website frontend",
      "status": TaskStatus.IN_PROGRESS,
      "createdAt": "2024-04-18T05:02:51.417647Z",
      "deadlineAt": "2024-04-15T18:00:00Z",
      "finishedAt": null,
      "payedAt": null,
      "description": "Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript. Create responsive frontend for a corporate website with HTML, CSS, and JavaScript.",
      "customerId": 1,
      "executorId": 1,
      "customerEmail": "ff@mail.com",
      "executorEmail": "ff1@mail.com",
      "workTypeId": null,
      "price": 100,
      "customerCurrency": "USD",
      "executorCurrency": "USD",
      contractId: null,
      signature: "",
      files: []
    },
    {
      "id": 2,
      "taskId": 3,
      "title": "Develop website frontendDevelop website frontend",
      "status": TaskStatus.ASSIGNED,
      "createdAt": "2024-04-18T05:53:42.257115Z",
      "deadlineAt": "2024-04-15T18:00:00Z",
      "finishedAt": null,
      "payedAt": null,
      "description": "Create responsive frontend for a corporate website with HTML, CSS, and JavaScript",
      "customerId": 1,
      "executorId": 1,
      "customerEmail": "ff@mail.com",
      "executorEmail": "ff1@mail.com",
      "workTypeId": null,
      "price": 250,
      "customerCurrency": "USD",
      "executorCurrency": "USD",
      contractId: null,
      signature: "",
      files: []
    }
  ]


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
      {tasks.map(task => (
        <TaskRow key={task.id} task={task} />
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
