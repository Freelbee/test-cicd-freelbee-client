'use client';

import { TaskAcceptanceStep, setAcceptanceStep } from "@freelancer/entities";
import { ActionsContainer, ContractDownload, FormGrid, useAppSelector } from "@freelancer/features";
import { Button, ButtonStyleEnum, Checkbox, Heading1, Input, Text } from "@freelbee/shared/ui-kit";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TaskAcceptanceContext } from "./context/TaskAcceptanceContext";

export const ContractStep = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const dispatch = useDispatch();
    const {formData, setFormData} = useContext(TaskAcceptanceContext);
    const [agreementChecked, setAgreementChecked] = useState<boolean>(false);

    if(!displayedTask) return <></>;
    
  return (
    <FormGrid>
        <FormGrid>
            <Heading1>Signing the contract</Heading1>   
            <ContractDownload taskId={displayedTask.id} />
        </FormGrid>
        <Input
            label="Signature"
            placeholder="Enter signature"
            value={formData.freelancerSignature}
            setValue={(v) => setFormData('freelancerSignature', v.trim())}
          />
        <CheckContent>
            <Checkbox 
                onChange={() => setAgreementChecked((prev) => !prev)}
                isCheck={agreementChecked} />
            <Text font='body'>
                {`By checking the box, I agree with the terms and conditions of the Contract. All the data I've provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described`} 
            </Text>
        </CheckContent>

        <ActionsContainer>
            <Button
                disabled={!agreementChecked || !formData.freelancerSignature}
                isWide
                onClick={() => dispatch(setAcceptanceStep(TaskAcceptanceStep.PAYMENT))}
                styleType={ButtonStyleEnum.GREEN}>
                Accept & Sign
            </Button>
            <Button
                styleType={ButtonStyleEnum.STROKE_WHITE}
                onClick={()=> {
                    dispatch(setAcceptanceStep(null));
                }}
                isWide>
                Back
            </Button>
        </ActionsContainer>
    </FormGrid>
  )
}

const CheckContent = styled.div`
    display: flex;
    gap: 8px;
    padding-top: 16px;
`