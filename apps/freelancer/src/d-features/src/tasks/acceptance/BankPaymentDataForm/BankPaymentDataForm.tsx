'use client';

import { Input } from "@freelbee/shared/ui-kit";
import { useAppSelector } from "../../../store";
import { FormGrid } from "../../taskDetails/ui/FormGrid";
import styled from "styled-components";

export const BankPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);

    if(!displayedTask) return <></>;
    
  return (
    <Container>

        <FormGrid>
            <Input 
            label="Bank account number" 
            placeholder="Bank account number"
            isRequired
            value={''} 
            setValue={() => {}} />   
            
            <Input 
            label="IBAN" 
            isRequired
            placeholder="PL61109010140000071219812874" 
            maxLength={34}
            value={''} 
            setValue={() => {}} />           

             <Input 
            label="Account holder name" 
            isRequired
            placeholder="John Silver" 
            maxLength={100}
            value={''} 
            setValue={() => {}} />     

            <Input 
            label="Bank name" 
            isRequired
            placeholder="For example, Bank of Georgia" 
            value={''} 
            setValue={() => {}} />     

            <Input 
            label="BIC / SWIFT" 
            isRequired
            placeholder="BIC / SWIFT" 
            value={''} 
            setValue={() => {}} />         
        </FormGrid>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    gap: 32px;
`