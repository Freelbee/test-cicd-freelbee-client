'use client';

import { BORDER_RADIUS, Breakpoint, CloseBtnSize, CloseButton, Color, ModalWindow, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { useDispatch } from "react-redux";
import { useAppSelector } from "@freelancer/features";
import { TaskAcceptanceStep, setDetailsOpen } from "@freelancer/entities";
import { TaskStatus } from "@freelbee/entities";
import { TaskDescription } from "./ui/TaskDescription";
import styled, { css } from "styled-components";
import { ContractStep } from "./ui/acceptance/ContractStep";
import { PaymentStep } from "./ui/acceptance/PaymentStep";
import { AcceptanceData, PaymentFormData, TaskAcceptanceContext } from "./ui/acceptance/context/TaskAcceptanceContext";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { ValidatorResult } from "@freelbee/features";
import { useState } from "react";

const DEFAULT_ACCEPTANCE_DATA: AcceptanceData = {
    freelancerSignature: "",
    freelancerPaymentDetails: "",
    freelancerCurrency: null,
    paymentMethodType: null
}

export const TaskDetailsModal = () => {

const dispatch = useDispatch();
const {displayedTask, detailsOpen, acceptanceStep} = useAppSelector(state => state.taskSliceReducer);
const [data, setData] = useDataStateUpdater<AcceptanceData>(DEFAULT_ACCEPTANCE_DATA);
const [validatorResult, setValidatorResult] = useState<ValidatorResult<PaymentFormData> | null>(null);
const [paymentData, setPaymentData, resetPaymentForm] = useDataStateUpdater<PaymentFormData>({});

const resetForm = () => {
    resetPaymentForm({});
    setData('freelancerCurrency', null);
    setData('freelancerPaymentDetails', '');
    setData('freelancerSignature', '');
    setData('paymentMethodType', null);
}

const closeModalWindow = () => {
    dispatch(setDetailsOpen(false));
    resetForm();
};

if(!displayedTask) return <></>;

const getWindowContent = () => {
    if(acceptanceStep && displayedTask.status === TaskStatus.ASSIGNED) {
        return <TaskAcceptanceContext.Provider value={{
            validatorResult,
            setValidatorResult,
            resetFormData: resetForm,
            resetPaymentData: () => resetPaymentForm({}),
            formData: data,
            setFormData: setData,
            paymentFormData: paymentData,
            setPaymentFormData: setPaymentData
        }}>
            {acceptanceStep === TaskAcceptanceStep.CONTRACT && <ContractStep />}
            {acceptanceStep === TaskAcceptanceStep.PAYMENT && <PaymentStep />}
        </TaskAcceptanceContext.Provider>
    }
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
    width: 540px;
    border-radius: ${BORDER_RADIUS.L};
    background-color: ${Color.WHITE};

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 24px;
        width: 100%;
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