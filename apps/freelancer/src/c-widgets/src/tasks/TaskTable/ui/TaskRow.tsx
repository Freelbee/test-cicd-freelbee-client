'use client';

import { Status } from "@freelancer/features";
import { TaskCounterpartyDataDto, TaskStatus } from "@freelbee/entities";
import { Breakpoint, Color, Text, mediaBreakpointDown, typography, vw } from "@freelbee/shared/ui-kit";
import moment from "moment";
import styled from "styled-components";

interface Props {
    task: TaskCounterpartyDataDto;
}

export const TaskRow = ({task}: Props) => {

  return (
    <Container>
        <MobileTitle>ID</MobileTitle>
        <Text font='bodySmall'>{task.id}</Text>

        <MobileTitle>Name</MobileTitle>
        <TaskName color={task.status === TaskStatus.NEW ? Color.BLUE : Color.GRAY_900}>
            {task.title}
        </TaskName>

        <MobileTitle>Company</MobileTitle>
        <a href={`mailto:${task.customerEmail}`}>
         <Text font='bodySmall' color={Color.GRAY_600}>{task.customerEmail}</Text>   
        </a>

        <MobileTitle>Amount</MobileTitle>
        <Text font='bodySmall'>{`${task.price} ${task?.customerCurrency || ''}`}</Text>

        <MobileTitle>Deadline</MobileTitle>
        <Text font='bodySmall'>{moment(task.deadlineAt).format('DD.MM.YYYY')}</Text>

        <MobileTitle>Status</MobileTitle>
        <StatusContainer>
            <Status 
                task={task} 
                openTask={() => {}} />
        </StatusContainer>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 40px 2fr 1fr 0.8fr 0.8fr 0.8fr;
    align-items: center;
    padding: 16px;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        gap: 8px;
        grid-template-columns: 0.8fr 1.2fr;
        border: 1px solid ${Color.GRAY_400};
        border-radius: 16px;

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const StatusContainer = styled.div`
    width: min-content;
`;

const TaskName = styled.span<{ color: Color }>`
  ${typography.body};
  color: ${({color}) => color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  
  ${mediaBreakpointDown(Breakpoint.Medium)} {
    max-width: ${vw(280, Breakpoint.Tablet)}
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    white-space: normal;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
`;

const MobileTitle = styled.div`
  ${typography.body};
  color: ${Color.GRAY_600};
  display: none;
  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    display: block;
  }
`;