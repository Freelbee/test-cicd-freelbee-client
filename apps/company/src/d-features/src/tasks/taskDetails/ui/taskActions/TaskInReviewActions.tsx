'use client';

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetCompanyCounterpartyQuery, useSetTaskStatusMutation } from "@company/entities";
import { CounterpartyStatus, PaymentProviderName, TaskStatus } from '@freelbee/entities';
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum, Checkbox, Color, InfoWithIcon, Text } from '@freelbee/shared/ui-kit';
import React, { useState } from 'react';
import { ReactComponent as AlertIcon } from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import styled from 'styled-components';

export default function TaskInReviewActions () {
    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus] = useSetTaskStatusMutation();
    const {data: company} = useGetCompanyCounterpartyQuery();
    const [isBoxChecked, setBoxChecked] = useState(false);

    const isNebeusAccountCreated = false; //TODO::: add request and uncomment

    const isButtonApproveDisabled = !isBoxChecked || company?.counterpartyDetail.status !== CounterpartyStatus.APPROVED || !isNebeusAccountCreated;
    const isButtonRefineDisabled = company?.counterpartyDetail.status !== CounterpartyStatus.APPROVED;

    const handleSetStatus = (status: TaskStatus) => {
        if (!displayedTask) return;

        setTaskStatus({
            taskId: displayedTask.taskId,
            status
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <>
            <TermsAgreementContainer>
                <Checkbox isCheck={isBoxChecked} onChange={() => setBoxChecked((isBoxChecked) => !isBoxChecked)} />
                <Text font="body">{`By checking the box, I agree with the terms and conditions of the Contract. All the data I've provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described`}</Text>
            </TermsAgreementContainer>

            {displayedTask?.paymentProviderName === PaymentProviderName.NEBEUS && !isNebeusAccountCreated && (
                <InfoWithIcon
                    Icon={AlertIcon}
                    textColor={Color.ORANGE}
                    background={Color.BG_ORANGE}
                    align="flex-start"
                    font="body"
                >
                    Your account is still in the process of creation, for more information contact support
                </InfoWithIcon>
            )}

            <ActionsContainer>
                <Button
                    disabled={isButtonApproveDisabled}
                    isWide
                    styleType={ButtonStyleEnum.GREEN}
                    onClick={()=> handleSetStatus(TaskStatus.WAITING_FOR_PAYMENT)}
                >
                    Approve
                </Button>
                <Button
                    disabled={isButtonRefineDisabled}
                    onClick={()=> handleSetStatus(TaskStatus.IN_PROGRESS)}
                    isWide
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                >
                    To refine
                </Button>
            </ActionsContainer>
        </>
    );
}

const TermsAgreementContainer = styled.div`
  display: flex;
  gap: 8px;
`;
