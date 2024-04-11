'use client';

import { Button, Color, InfoWithIcon, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState} from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { LanguageType } from "@freelbee/shared/language";
import { PaymentDataValidator } from "../util/PaymentDataValidator";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { PaymentMethodFormData } from "../interface/PaymentMethodsFormData";
import { PaymentMethodPropType } from "@freelbee/entities";

const initialData: PaymentMethodFormData = {
    [PaymentMethodPropType.BANK_ACCOUNT_NUMBER]: "",
    [PaymentMethodPropType.IBAN]: "",
    [PaymentMethodPropType.HOLDER_NAME]: "",
    [PaymentMethodPropType.BANK_NAME]: "",
    [PaymentMethodPropType.BIC_OR_SWIFT]: "",
    [PaymentMethodPropType.CRYPTO_WALLET_NUMBER]: "",
    [PaymentMethodPropType.CARD_NUMBER]: ""
}

export const PaymentDataForm = () => {

    const {setOpen} = useContext(OnboardingContext);
    const [validationResult, setValidationResult] = useState(new ValidatorResult<PaymentMethodFormData>());
    const validator = new PaymentDataValidator();
    const [data, setData] = useDataStateUpdater<PaymentMethodFormData>(initialData);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationResult = validator.validate(data);
        setValidationResult(validationResult);
        if(!validationResult.isSuccess()) {
            return;
        }
        // To-Do
        setOpen(false);
    }

  return (
    <Form onSubmit={submitHandler}>
        <Input 
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BANK_ACCOUNT_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, LanguageType.EN)}
            label="Bank account number"
            placeholder="Enter the account number" 
            value={data.BANK_ACCOUNT_NUMBER} 
            setValue={(v) => setData(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.IBAN)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.IBAN, LanguageType.EN)}
            label="IBAN"
            placeholder="Enter the IBAN" 
            value={data.IBAN} 
            setValue={(v) => setData(PaymentMethodPropType.IBAN, v)} />

        <Input 
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.HOLDER_NAME)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.HOLDER_NAME, LanguageType.EN)}
            label="Account holder name"
            maxLength={100}
            placeholder="John Silver" 
            value={data.HOLDER_NAME} 
            setValue={(v) => setData(PaymentMethodPropType.HOLDER_NAME, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BANK_NAME)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BANK_NAME, LanguageType.EN)}
            maxLength={100}
            label="Bank name"
            placeholder="For example, Bank of Georgia" 
            value={data.BANK_NAME} 
            setValue={(v) => setData(PaymentMethodPropType.BANK_NAME, v)} />      
        
        <Input 
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BIC_OR_SWIFT)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BIC_OR_SWIFT, LanguageType.EN)}
            maxLength={100}
            label="BIC / SWIFT"
            placeholder="BIC / SWIFT" 
            value={data.BIC_OR_SWIFT} 
            setValue={(v) => setData(PaymentMethodPropType.BIC_OR_SWIFT, v)} />    

        <InfoWithIcon
            Icon={AlertIcon}
            textColor={Color.BLUE}
            align='flex-start'
            font='body'
        >
            Fill all fields with * to continue.
        </InfoWithIcon>

        <Button 
            type="submit" 
            isWide
            >Submit</Button>
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;