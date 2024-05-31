'use client';

import { Button, Color, InfoWithIcon, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useState} from "react";
import styled from "styled-components";
import { ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { LanguageType } from "@freelbee/shared/language";
import { PaymentDataValidator } from "../util/PaymentDataValidator";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { PaymentMethodFormData } from "../interface/PaymentMethodsFormData";
import { PaymentMethodPropType, PaymentMethodType } from "@freelbee/entities";
import { useDispatch } from "react-redux";
import {
  setOnboardingOpened,
  useCreatePaymentMethodMutation,
  useGetCompanyCounterpartyQuery,
  useSendNotificationAboutNewCompanyForApprovalMutation
} from '@company/entities';
import { PropsHelper } from "@freelbee/shared/helpers";

const initialData: PaymentMethodFormData = {
    [PaymentMethodPropType.BANK_ACCOUNT_NUMBER]: "",
    [PaymentMethodPropType.IBAN]: "",
    [PaymentMethodPropType.HOLDER_NAME]: "",
    [PaymentMethodPropType.BANK_NAME]: "",
    [PaymentMethodPropType.BIC_OR_SWIFT]: ""
}

export const PaymentDataForm = () => {
    const dispatch = useDispatch();
    const {data: company, isLoading: isCompanyLoading } = useGetCompanyCounterpartyQuery();
    const [createPaymentData, {isLoading}] = useCreatePaymentMethodMutation();
    const [sendNotificationAboutNewCompanyForApproval] = useSendNotificationAboutNewCompanyForApprovalMutation();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<PaymentMethodFormData>());
    const validator = new PaymentDataValidator();
    const [data, setData] = useDataStateUpdater<PaymentMethodFormData>(initialData);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationResult = validator.validate(data);
        setValidationResult(validationResult);
        if(!validationResult.isSuccess() || !company) {
            return;
        }

        createPaymentData({
            counterpartyId: company.id,
            type: PaymentMethodType.BANK_ACCOUNT,
            props: PropsHelper.MapFieldsToProps(data)
        }).unwrap()
        .then(() => {
          dispatch(setOnboardingOpened(false));
          sendNotificationAboutNewCompanyForApproval(company.id);
        });
    }

  return (
    <Form onSubmit={submitHandler}>
        <Input
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BANK_ACCOUNT_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, LanguageType.EN)}
            label="Bank account number"
            placeholder="Enter the account number"
            value={data?.BANK_ACCOUNT_NUMBER ?? ''}
            setValue={(v) => setData(PaymentMethodPropType.BANK_ACCOUNT_NUMBER, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.IBAN)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.IBAN, LanguageType.EN)}
            label="IBAN"
            placeholder="Enter the IBAN"
            value={data?.IBAN ?? ''}
            setValue={(v) => setData(PaymentMethodPropType.IBAN, v)} />

        <Input
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.HOLDER_NAME)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.HOLDER_NAME, LanguageType.EN)}
            label="Account holder name"
            maxLength={100}
            placeholder="John Silver"
            value={data?.HOLDER_NAME ?? ''}
            setValue={(v) => setData(PaymentMethodPropType.HOLDER_NAME, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BANK_NAME)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BANK_NAME, LanguageType.EN)}
            maxLength={100}
            label="Bank name"
            placeholder="For example, Bank of Georgia"
            value={data?.BANK_NAME ?? ''}
            setValue={(v) => setData(PaymentMethodPropType.BANK_NAME, v)} />

        <Input
            isRequired
            isError={validationResult.hasError(PaymentMethodPropType.BIC_OR_SWIFT)}
            errorMessage={validationResult.getMessageByLanguage(PaymentMethodPropType.BIC_OR_SWIFT, LanguageType.EN)}
            maxLength={100}
            label="BIC / SWIFT"
            placeholder="BIC / SWIFT"
            value={data?.BIC_OR_SWIFT ?? ''}
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
            isLoading={isLoading || isCompanyLoading}
            >Submit</Button>
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;
