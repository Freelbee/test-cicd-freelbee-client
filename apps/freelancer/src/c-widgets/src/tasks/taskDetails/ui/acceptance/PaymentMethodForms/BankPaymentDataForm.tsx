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

export const BankPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const { data: currenciesNebeus = [] } = useGetCurrenciesQuery({provider: PaymentProviderName.NEBEUS, type: CurrencyType.FIAT});
    const {formData, setFormData, paymentFormData, setPaymentFormData, validatorResult} = useContext(TaskAcceptanceContext);

    if(!displayedTask) return <></>;
    
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
            isError={validatorResult?.hasError(PaymentMethodPropType.BANK_ACCOUNT_NUMBER)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, LanguageType.EN)}
            label="Bank account number" 
            placeholder="Bank account number"
            isRequired
            value={paymentFormData?.BANK_ACCOUNT_NUMBER ?? ''} 
            setValue={(v) => {
              setFormData('freelancerPaymentDetails', v);
              setPaymentFormData(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, v)
            }} />   
            
            <Input 
            isError={validatorResult?.hasError(PaymentMethodPropType.IBAN)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.IBAN, LanguageType.EN)}
            label="IBAN" 
            isRequired
            placeholder="PL61109010140000071219812874" 
            maxLength={34}
            value={paymentFormData?.IBAN ?? ''} 
            setValue={(v) => setPaymentFormData(PaymentMethodPropType.IBAN, v)} />           

             <Input 
             isError={validatorResult?.hasError(PaymentMethodPropType.HOLDER_NAME)}
             errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.HOLDER_NAME, LanguageType.EN)}
            label="Account holder name" 
            isRequired
            placeholder="John Silver" 
            maxLength={100}
            value={paymentFormData?.HOLDER_NAME ?? ''} 
            setValue={(v) => setPaymentFormData(PaymentMethodPropType.HOLDER_NAME, v)} />     

            <Input 
            isError={validatorResult?.hasError(PaymentMethodPropType.BANK_NAME)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.BANK_NAME, LanguageType.EN)}
            label="Bank name" 
            isRequired
            placeholder="For example, Bank of Georgia" 
            value={paymentFormData?.BANK_NAME ?? ''} 
            setValue={(v) => setPaymentFormData(PaymentMethodPropType.BANK_NAME, v)} />     

            <Input 
            isError={validatorResult?.hasError(PaymentMethodPropType.BIC_OR_SWIFT)}
            errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.BIC_OR_SWIFT, LanguageType.EN)}
            label="BIC / SWIFT" 
            isRequired
            placeholder="BIC / SWIFT" 
            value={paymentFormData?.BIC_OR_SWIFT ?? ''} 
            setValue={(v) => setPaymentFormData(PaymentMethodPropType.BIC_OR_SWIFT, v)} />         
        </FormGrid>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    gap: 32px;
`