'use client';

import { ContractDownload, useAppSelector } from "@freelancer/features";
import { Checkbox, Heading1, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";


export const ContractStep = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);

    if(!displayedTask) return <></>;
    
  return (
    <div>
        <Container>
            <Heading1>Signing the contract</Heading1>   
            <ContractDownload taskId={displayedTask.id} />
        </Container>

        <CheckContent>
            <Checkbox isCheck={false} />
            <Text font='body'>
                {`By checking the box, I agree with the terms and conditions of the Contract. All the data I've provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described`} 
            </Text>
        </CheckContent>
    </div>
  )
}

const Container = styled.div`
    display: grid;
    gap: 16px;
`

const CheckContent = styled.div`
    display: flex;
    gap: 8px;
    padding-top: 32px;
`