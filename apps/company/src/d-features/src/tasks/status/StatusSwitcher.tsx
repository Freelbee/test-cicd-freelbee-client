/* eslint-disable @typescript-eslint/no-explicit-any */
import {KeyboardEventHandler,useRef, useState} from 'react';
import styled from 'styled-components';

import {ReactComponent as ArrowIcon} from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
import { Color, typography } from '@freelbee/shared/ui-kit';
import { TaskCounterpartyDataDto, TaskStatus } from '@freelbee/entities';
import { useSetTaskStatusMutation } from '@company/entities';
import { useOnClickOutside } from '@freelbee/shared/hooks';

export enum StatusColor {
    NEW = Color.BLUE,
    ASSIGNED = Color.PLAN,
    IN_PROCESS = Color.PROCESSING,
    PAID = Color.SWAMPY,
    IN_REVIVING = Color.CHECKING,
    CANCELLED = Color.ERROR,
}

export enum StatusBackground {
    NEW = Color.BG_BLUE,
    ASSIGNED = '#F4F0FF',
    PAID = Color.BG_SWAMPY,
    IN_PROCESS = Color.BG_YELLOW,
    IN_REVIVING = Color.BG_YELLOW,
    CANCELLED = Color.BG_RED,
}

export type Params = {
    [key in TaskStatus]?: Array<{
        toStatus: TaskStatus,
        text: string,
        hoverColor?: StatusColor,
        hoverBackground?: StatusBackground,
        onSetStatus?: () => void
    }>
};

const params: Params = {
    [TaskStatus.NEW]: [
        {
            toStatus: TaskStatus.ASSIGNED,
            text: 'To Assign',
            hoverColor: StatusColor.ASSIGNED,
            hoverBackground: StatusBackground.ASSIGNED,

        },
        {
            toStatus: TaskStatus.CANCELLED,
            text: 'Cancel',
            hoverColor: StatusColor.CANCELLED,
            hoverBackground: StatusBackground.CANCELLED,
        },
    ],
    [TaskStatus.ASSIGNED]: [
        {
            toStatus: TaskStatus.CANCELLED,
            text: 'Cancel',
            hoverColor: StatusColor.CANCELLED,
            hoverBackground: StatusBackground.CANCELLED,
        }

    ],
    [TaskStatus.REVIEWING]: [{
        toStatus: TaskStatus.PAID,
        text: 'To Pay',
        hoverColor: StatusColor.PAID,
        hoverBackground: StatusBackground.PAID,
    },
    {
        toStatus: TaskStatus.IN_PROGRESS,
        text: 'To Refine',
        hoverColor: StatusColor.CANCELLED,
        hoverBackground: StatusBackground.CANCELLED,
    },
    ]
};

type Props = {
    task: TaskCounterpartyDataDto,
    openTask: () => void,
    disabledActions?: boolean
};

export function Status (props: Props) {

    const {task, openTask, disabledActions = false} = props;
    const [menuStatusIsOpen, setMenuStatusIsOpen] = useState(false);
    // const [{userData}] = useUserData();
    const [setTaskStatus] = useSetTaskStatusMutation();

    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        setMenuStatusIsOpen(false);
    }, buttonRef);


    const getNameByStatus = (status:TaskStatus) => {

        // To - Do что делать с приглашенными?
        // if (!freelancerIsRegistered() && status !==TaskStatus.CANCELLED) {
        //     return (
        //         <Pill
        //             id={'pill'}
        //             color={StatusColor.NEW}
        //             background={StatusBackground.NEW}
        //             ref={buttonRef}>
        //             Awaiting
        //         </Pill>
        //     );
        // }

        switch (status) {
            case TaskStatus.NEW:
                return (
                    <Pill
                        ref={buttonRef}
                        color={StatusColor.NEW}
                        background={StatusBackground.NEW}>
                         New
                        <ArrowIcon />
                    </Pill>
                );

            case TaskStatus.ASSIGNED:
                return (
                    <Pill
                        color={StatusColor.ASSIGNED}
                        background={StatusBackground.ASSIGNED}
                        ref={buttonRef}
                    >
                        Assigned
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.IN_PROGRESS:
                return (
                    <Pill
                        color={StatusColor.IN_PROCESS}
                        background={StatusBackground.IN_PROCESS}
                        ref={buttonRef}>
                       In progress
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.REVIEWING:
                return (
                    <Pill
                        ref={buttonRef}
                        color={StatusColor.IN_REVIVING}
                        background={StatusBackground.IN_REVIVING}>
                        Reviewing
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.PAID:
                return (
                    <Pill
                        color={StatusColor.PAID}
                        background={StatusBackground.PAID} >
                        Paid
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.CANCELLED:
                return (
                    <Pill
                        color={StatusColor.CANCELLED}
                        background={StatusBackground.CANCELLED}>
                        CANCELLED
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.PAYMENT_IN_PROGRESS:
                return (
                    <Pill
                        color={StatusColor.IN_PROCESS}
                        background={StatusBackground.IN_PROCESS}
                        ref={buttonRef}>
                        Processing
                        <ArrowIcon />
                    </Pill>
                );
            case TaskStatus.PAYMENT_ERROR:
                return (
                    <Pill
                        color={StatusColor.CANCELLED}
                        background={StatusBackground.CANCELLED}>
                        Error
                        <ArrowIcon />
                    </Pill>
                );
        }
    };

    const setStatus = (status: TaskStatus) => {
        setTaskStatus({
            taskId: task.id,
            status
        });
    };

    const getParams = (status: TaskStatus) => {
        
        const ourParams = params[status];

        return <StatusPopup ref={modalRef} $isOpen={menuStatusIsOpen}>
            <StatusNamePopupTextBlack
                tabIndex={menuStatusIsOpen ? 0 : -1}
                onClick={openTask}
            >
                Open
            </StatusNamePopupTextBlack>
            
            {ourParams?.map(({hoverBackground, hoverColor, text, toStatus, onSetStatus}, i) => (
                <StatusNamePopupText
                    key={i}
                    disabled={disabledActions}
                    tabIndex={menuStatusIsOpen ? 0 : -1}
                    hoverColor={hoverColor}
                    hoverBackground={hoverBackground}
                    onClick={() => onSetStatus ? onSetStatus() : setStatus(toStatus)}
                >{text}</StatusNamePopupText>
            ))}
        </StatusPopup>;
    };

    const stopAllPaginationEvents = () => ({
        onMouseDown: (e: any) => e.stopPropagation(),
        onMouseUp: (e: any) => e.stopPropagation(),
        onTouchStart: (e: any) => e.stopPropagation(),
        onMouseLeave: (e: any) => e.stopPropagation(),
        onTouchEnd: (e: any) => e.stopPropagation(),
    });

    const handleOpenOnKeydown: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if(e.code === 'Space') {
            e.preventDefault();
            setMenuStatusIsOpen(prev => !prev);
        }
    };

    return (
        <Container
            tabIndex={0}
            onKeyDown={handleOpenOnKeydown}
            $isOpen={menuStatusIsOpen}
            {...stopAllPaginationEvents()}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setMenuStatusIsOpen(prev => !prev);
            }}>
            {getNameByStatus(task.status)}
            
            {/* {userData.status === UserStatus.APPROVED && getParams(task.status)} */}
            {getParams(task.status)}
        </Container>

    );
}

const Container = styled.div<{$isOpen: boolean}>`
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  cursor: pointer;
`;

const Pill = styled.div<{ color: StatusColor, background: StatusBackground }>`
  ${typography.bodySmall};
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 128px;
  height: 30px;
  padding: 6px 10px;
  border-radius: 6px;
  justify-content: center;
  color: ${({color}) => color};
  background: ${({background}) => background};
  transition: box-shadow 0.5s;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    stroke: ${({ color }) => color};
  }

  &:hover {
    box-shadow: 0 0 4px 0 ${({color}) => color};
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;


const StatusPopup = styled.div<{$isOpen: boolean}>`
  z-index: 1;
  min-width: 100%;
  width: max-content;
  max-width: 200px;
  padding: 7px;
  position: absolute;
  right: 50%;
  transform: translate(50%, 0%);
  box-shadow: 0px 4px 34px rgb(0 0 0 / 15%);
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 1px solid transparent;
  transition: top .5s, opacity .5s, visibility .5s;
  top: ${({$isOpen}) => $isOpen ? 'calc(100% + 15px)' : '100%'};
  visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'visable'};
  opacity: ${({$isOpen}) => $isOpen ? '1' : '0'};
  pointer-events: ${({$isOpen}) => $isOpen ? 'all' : 'none'};
`;

const StatusNamePopupText = styled.button<{hoverColor?: StatusColor, hoverBackground?: StatusBackground}>`
  ${typography.bodySmall};
  padding: 8px 8px;
  transition: .5s;
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  &:hover {
    color: ${({hoverColor}) => hoverColor};
    background: ${({hoverBackground}) => hoverBackground ?? '#f1f4f4'} ;
  }

  &:disabled {
    opacity: 0.8;
    pointer-events: none;
  }
`;

const StatusNamePopupTextBlack = styled(StatusNamePopupText)`
  background: ${Color.GRAY_800};
  color: ${Color.WHITE};
  &:hover {
    background: ${Color.EMERALD};
  }
`;