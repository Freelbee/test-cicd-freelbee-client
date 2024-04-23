'use client';

import { BORDER_RADIUS, Breakpoint, CloseBtnSize, CloseButton, Color, ModalWindow, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { useDispatch } from "react-redux";
import { TaskDescription } from "./ui/TaskDescription";
import styled, { css } from "styled-components";
import { setDetailsOpen } from "@company/entities";
import { useAppSelector } from "@company/features";

export const TaskDetailsModal = () => {

const dispatch = useDispatch();
const {displayedTask, detailsOpen} = useAppSelector(state => state.taskSliceReducer);

const closeModalWindow = () => dispatch(setDetailsOpen(false));

if(!displayedTask) return <></>;

const getWindowContent = () => {
    return <TaskDescription/>;
}

return (
    <ModalWindow 
        isOpen={detailsOpen} 
        onClose={closeModalWindow}>
        <Container>
            <CloseButton 
                size={CloseBtnSize.M}
                styles={closeBtnStyle}
                clickHandler={closeModalWindow} />
            {getWindowContent()}                
        </Container>
    </ModalWindow> 
  )
}

const Container = styled.div`
    position: relative;
    padding: 32px;
    max-width: 540px;
    border-radius: ${BORDER_RADIUS.L};
    background-color: ${Color.WHITE};

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding: 16px;
    }
`

const closeBtnStyle = css`
  position: absolute;
  top: 32px;
  right: 32px;  

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        top: 24px;
        right: 24px;  
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        top: 16px;
        right: 16px;  
    }
`;