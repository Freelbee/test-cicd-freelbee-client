'use client';

import { useTasksData } from "@company/entities";
import { TaskStatus } from "@freelbee/entities";
import {BORDER_RADIUS, Breakpoint, Color, Heading1, mediaBreakpointDown, Text} from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { AddTaskButton } from "./ui/AddTaskButton";
import {ReactComponent as Icon} from '@freelbee/assets/icons/check/checked-square.svg';
import {InviteFreelancerButton} from "../../freelancer/FreelancersHeading/ui/InviteFreelancerButton";

export const TasksCounter = () => {

    const [tasks] = useTasksData();
    const count = tasks.filter(t => ![TaskStatus.CANCELLED, TaskStatus.PAID].includes(t.status)).length;

  return (
    <Container>
        <IconContainer>
            <Icon />
        </IconContainer>
        <TextContent>
            <Heading1>{count}</Heading1>
            <Text font='body' color={Color.GRAY_600}>Active Tasks</Text>
        </TextContent>
      <ButtonContainer>
        <AddTaskButton />
        <InviteFreelancerButton/>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
    background-color: ${Color.WHITE};
    border-radius: ${BORDER_RADIUS.L};
    display: flex;
    align-items: center;
    gap: 24px;
`;

const IconContainer = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${Color.BG_BLUE};
    border-radius: ${BORDER_RADIUS.S};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 32px;
        height: 32px;
        stroke: ${Color.BLUE};
    }
`;

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-left: auto;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
      flex-direction: column;
      gap: 12px
    }
`;
