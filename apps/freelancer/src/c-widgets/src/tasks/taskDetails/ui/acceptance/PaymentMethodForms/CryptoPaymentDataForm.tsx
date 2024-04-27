'use client';

import { useGetCurrenciesQuery } from "@freelancer/entities";
import { FormGrid, useAppSelector } from "@freelancer/features";
import { Currency, CurrencyType, PaymentMethodPropType, PaymentProviderName } from "@freelbee/entities";
import { Input, SelectWithSearch } from "@freelbee/shared/ui-kit";
import { useContext } from "react";
import { TaskAcceptanceContext } from "../context/TaskAcceptanceContext";
import { LanguageType } from "@freelbee/shared/language";
import { CurrencySelectItem } from "./CurrencySelectItem";

export const CryptoPaymentDataForm = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const {formData, setFormData, paymentFormData, setPaymentFormData, validatorResult} = useContext(TaskAcceptanceContext);
    const { data: currenciesTransak = [] } = useGetCurrenciesQuery({provider: PaymentProviderName.TRANSAK, type: CurrencyType.CRYPTO});

    if(!displayedTask) return <></>;
    
  return (
    <FormGrid>
         <Input 
          isError={validatorResult?.hasError(PaymentMethodPropType.CRYPTO_WALLET_ADDRESS)}
          errorMessage={validatorResult?.getMessageByLanguage(PaymentMethodPropType.CRYPTO_WALLET_ADDRESS, LanguageType.EN)}
          label="Wallet adress for debiting funds" 
          isRequired
          placeholder="Enter the wallet adress" 
          value={paymentFormData?.CRYPTO_WALLET_ADDRESS ?? ''} 
          setValue={(v) => {
            setFormData('freelancerPaymentDetails', v);
            setPaymentFormData(PaymentMethodPropType.CRYPTO_WALLET_ADDRESS, v)
          }} />   

          <SelectWithSearch<Currency>
                label='Cryptocurrency*'
                placeholder='Select from the dropdown'
                items={currenciesTransak}
                value={formData.freelancerCurrency}
                setValue={(item) => setFormData('freelancerCurrency', item)}
                renderOption={(item) => <CurrencySelectItem currency={item} />}
                getStringValue={v => v.code}
                hideSearch={true}
            />   
    </FormGrid>
  )
}
