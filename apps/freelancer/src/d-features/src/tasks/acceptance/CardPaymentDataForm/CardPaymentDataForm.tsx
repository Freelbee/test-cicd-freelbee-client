'use client';

import { Input } from "@freelbee/shared/ui-kit";
import { useAppSelector } from "../../../store";
import { FormGrid } from "../../taskDetails/ui/FormGrid";
import styled from "styled-components";

export const CardPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);

    if(!displayedTask) return <></>;
    
  return (
    <Container>
        

        <FormGrid>
            <Input 
            label="Card number" 
            isRequired
            placeholder="0000 0000 0000 0000 000" 
            maxLength={19}
            value={''} 
            setValue={() => {}} />   
            
            <Input 
            label="Cardholder name" 
            isRequired
            placeholder="John Silver" 
            maxLength={100}
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