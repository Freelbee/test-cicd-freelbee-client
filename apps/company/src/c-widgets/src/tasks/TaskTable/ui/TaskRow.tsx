'use client';

import { setDetailsOpen, setDisplayedTask } from "@company/entities";
import { Status } from "@company/features";
import { TaskCounterpartyDataDto, TaskStatus } from "@freelbee/entities";
import { DateUtil } from "@freelbee/shared/helpers";
import { Breakpoint, Color, Text, mediaBreakpointDown, typography, vw } from "@freelbee/shared/ui-kit";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface Props {
    task: TaskCounterpartyDataDto;
}

export const TaskRow = ({task}: Props) => {

  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setDisplayedTask(task));
    dispatch(setDetailsOpen(true));
  }

  return (
    <Container onClick={handleOpen}>
        <MobileTitle>ID</MobileTitle>
        <Text font='bodySmall'>{task.taskId}</Text>

        <MobileTitle>Name</MobileTitle>
        <TaskName color={task.status === TaskStatus.NEW ? Color.BLUE : Color.GRAY_900}>
            {task.title}
        </TaskName>

        <MobileTitle>Freelancer</MobileTitle>
        <TextWithDots font='bodySmall' color={Color.GRAY_600}>{task.executorEmail}</TextWithDots>

        <MobileTitle>Amount</MobileTitle>
        <TextWithDots font='bodySmall'>{task.price}&nbsp;{task?.customerCurrency || ''}</TextWithDots>

        <MobileTitle>Deadline</MobileTitle>
        <Text font='bodySmall'>
          {` ${DateUtil.getFormatDate(task?.deadlineAt) ?? '--  --'}`}
        </Text>

        <MobileTitle>Status</MobileTitle>
        <StatusContainer onClick={e => e.preventDefault()}>
            <Status
                task={task}
                openTask={handleOpen} />
        </StatusContainer>
    </Container>
  )
}

const Container = styled.div`
    cursor: pointer;
    display: grid;
    grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 0.9fr 128px;
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
  ${typography.bodySmall};
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

const TextWithDots = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileTitle = styled.div`
  ${typography.body};
  color: ${Color.GRAY_600};
  display: none;
  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    display: block;
  }
`;
