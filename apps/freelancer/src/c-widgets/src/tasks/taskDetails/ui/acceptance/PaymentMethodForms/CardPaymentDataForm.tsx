'use client';

import { useGetCurrenciesQuery } from "@freelancer/entities";
import { FormGrid, useAppSelector } from "@freelancer/features";
import { Currency, CurrencyType, PaymentMethodPropType, PaymentProviderName } from "@freelbee/entities";
import { Input, SelectWithSearch } from "@freelbee/shared/ui-kit";
import { useContext } from "react";
import styled from "styled-components";
import { TaskAcceptanceContext } from "../context/TaskAcceptanceContext";
import { LanguageType } from "@freelbee/shared/language";
import { CurrencySelectItem } from "./CurrencySelectItem";

export const CardPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const { data: currenciesNebeus = [] } = useGetCurrenciesQuery({provider: PaymentProviderName.NEBEUS, type: CurrencyType.FIAT});
    const {formData, setFormData, paymentFormData, setPaymentFormData, validatorResult} = useContext(TaskAcceptanceContext);

    if(!displayedTask) return <></>;

    console.log('V FROM CARD', paymentFormData)
    
  return (
    <Container>
        <SelectWithSearch<Currency>
              label='Currency*'
              placeholder='Select from the dropdown'
              items={currenciesNebeus}
              value={formData.freelancerCurrency}
              setValue={(item) => setFormData('freelancerCurrency', item)}
              renderOption={(item) => <CurrencySelectItem currency={item} />}
              getStringValue={v => v.code}
              hideSearch={true}
          />  

        <FormGrid>
            <Input 
            isError={validatorResult?.hasError(PaymentMethodPropType.CARD_NUMBER)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.CARD_NUMBER, LanguageType.EN)}
            label="Card number" 
            isRequired
            placeholder="0000 0000 0000 0000 0000" 
            maxLength={19}
            value={paymentFormData?.CARD_NUMBER ?? ''} 
            setValue={(v) => {
              setPaymentFormData(PaymentMethodPropType.CARD_NUMBER, v)
              setFormData('freelancerPaymentDetails', v)}
            }/>   
            
            <Input 
            isError={validatorResult?.hasError(PaymentMethodPropType.HOLDER_NAME)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.HOLDER_NAME, LanguageType.EN)}
            label="Cardholder name" 
            isRequired
            placeholder="John Silver" 
            maxLength={100}
            value={paymentFormData?.HOLDER_NAME ?? ''} 
            setValue={(v) => setPaymentFormData(PaymentMethodPropType.HOLDER_NAME, v)} />               
        </FormGrid>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    gap: 32px;
`