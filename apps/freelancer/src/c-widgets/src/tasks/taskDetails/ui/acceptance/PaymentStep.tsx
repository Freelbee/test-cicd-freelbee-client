'use client';

import { Button, ButtonStyleEnum, Color, Heading1, InfoWithIcon, SelectWithSearch, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { ReactComponent as CryptoIcon } from '@freelbee/assets/icons/payment-method/bitcoin.svg';
import { ReactComponent as CardIcon } from '@freelbee/assets/icons/payment-method/card.svg';
import { ReactComponent as BankIcon } from '@freelbee/assets/icons/payment-method/bank.svg';
import { ActionsContainer, FormGrid, useAppSelector } from "@freelancer/features";
import { PaymentMethodPropType, PaymentMethodType, PaymentProviderName } from "@freelbee/entities";
import { CryptoTips } from "./PaymentMethosTips/CryptoTips";
import { BancAccountTips } from "./PaymentMethosTips/BancAccountTips";
import { useDispatch } from "react-redux";
import {
  TaskAcceptanceStep,
  setAcceptanceStep,
  setDetailsOpen,
  useAcceptTaskMutation,
  useGetFreelancerCounterpartyQuery
} from '@freelancer/entities';
import { BankPaymentDataForm } from "./PaymentMethodForms/BankPaymentDataForm";
import { CryptoPaymentDataForm } from "./PaymentMethodForms/CryptoPaymentDataForm";
import { CardPaymentDataForm } from "./PaymentMethodForms/CardPaymentDataForm";
import { useContext } from "react";
import { TaskAcceptanceContext } from "./context/TaskAcceptanceContext";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { PropsHelper } from "@freelbee/shared/helpers";
import { BankFormValidator } from "./util/BankFormValidator";
import { CardFormValidator } from "./util/CardFormValidator";
import { CryptoFormValidator } from "./util/CryptoFormValidator";
import { AbstractValidator } from "@freelbee/features";

const TIPS_BY_PAYMENT_METHOD: Record<PaymentMethodType, JSX.Element> = {
    [PaymentMethodType.BANK_ACCOUNT]: <BancAccountTips />,
    [PaymentMethodType.CRYPTO_WALLET]: <CryptoTips />,
    [PaymentMethodType.CARD]: <></>
}

const PAYMENT_METHOD_FORM: Record<PaymentMethodType, JSX.Element> = {
    [PaymentMethodType.BANK_ACCOUNT]: <BankPaymentDataForm/>,
    [PaymentMethodType.CRYPTO_WALLET]: <CryptoPaymentDataForm/>,
    [PaymentMethodType.CARD]: <CardPaymentDataForm />
}

const PAYMENT_METHOD_ICONS: Record<PaymentMethodType, JSX.Element> = {
    [PaymentMethodType.BANK_ACCOUNT]: <BankIcon/>,
    [PaymentMethodType.CRYPTO_WALLET]: <CryptoIcon />,
    [PaymentMethodType.CARD]: <CardIcon />
}

const PAYMENT_METHOD_NAMES: Record<PaymentMethodType, string> = {
    [PaymentMethodType.BANK_ACCOUNT]: 'Bank account',
    [PaymentMethodType.CRYPTO_WALLET]: 'Crypto',
    [PaymentMethodType.CARD]: 'Card'
}

const PAYMENT_METHOD_VALIDATORS: Record<PaymentMethodType, AbstractValidator<Partial<{[K in PaymentMethodPropType]: string}>>> = {
    [PaymentMethodType.BANK_ACCOUNT]: new BankFormValidator(),
    [PaymentMethodType.CRYPTO_WALLET]: new CryptoFormValidator(),
    [PaymentMethodType.CARD]: new CardFormValidator()
}

const PAYMENT_METHODS_BY_PROVIDER: Record<PaymentProviderName, Array<PaymentMethodType>> = {
    [PaymentProviderName.NEBEUS]: [PaymentMethodType.CRYPTO_WALLET, PaymentMethodType.CARD],
    [PaymentProviderName.TRANSAK]: [PaymentMethodType.CRYPTO_WALLET]
}

export const PaymentStep = () => {

    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [acceptTask, {isLoading}] = useAcceptTaskMutation();
    const {data: freelancer} = useGetFreelancerCounterpartyQuery();
    const {formData,
        setFormData,
        paymentFormData,
        resetPaymentData,
        resetFormData,
        setValidatorResult} = useContext(TaskAcceptanceContext);

    const validatePaymentData = () => {
        if(!formData.paymentMethodType) return;

        const validationResult = PAYMENT_METHOD_VALIDATORS[formData.paymentMethodType]
        .validate(paymentFormData);

        setValidatorResult(validationResult);
        return validationResult;
    }

    const handleAccept = () => {
        if(!displayedTask || !displayedTask.contractId || !freelancer || !formData.paymentMethodType) return;

        const validationResult = validatePaymentData();
        if(validationResult && !validationResult.isSuccess()) {
            return;
        }

        const body = {
            contractId: displayedTask.contractId,
            freelancerCounterpartyId: freelancer?.id,
            freelancerSignature: formData.freelancerSignature,
            freelancerPaymentDetails: formData.freelancerPaymentDetails,
            freelancerCurrencyId: formData.freelancerCurrency!.id,
            taskId: displayedTask.taskId,
            paymentMethodType: formData.paymentMethodType,
            receiverPaymentMethodProps: PropsHelper.MapFieldsToProps(paymentFormData)
        };

        acceptTask(body).unwrap().then(() => {
                dispatch(setDetailsOpen(false));
                resetFormData();
        });
    };

    const renderPaymentMethod = (paymentMethod: PaymentMethodType) => (
        <PaymentMethodContainer>
                {PAYMENT_METHOD_ICONS[paymentMethod]}
                <Text font={'body'} color={Color.GRAY_900}>
                    {PAYMENT_METHOD_NAMES[paymentMethod]}
                </Text>
        </PaymentMethodContainer>
      );

  return (
    <FormGrid>
        <Header>
            <Heading1>Payment detail</Heading1>
            <Text font='body'>Select the payment method by which you want to receive a reward from the drop-down list below</Text>
        </Header>

        <FormGrid>

        <RowContainer>
            <SelectWithSearch<PaymentMethodType>
                label='Payment method*'
                placeholder='Select from the dropdown list'
                items={PAYMENT_METHODS_BY_PROVIDER[displayedTask!.paymentProviderName]}
                value={formData.paymentMethodType}
                setValue={(item) => {
                    setFormData('paymentMethodType', item);
                    setFormData('freelancerCurrency', null);
                    setFormData('freelancerPaymentDetails', '');
                    setValidatorResult(null);
                    resetPaymentData();
                }}
                renderOption={(item) => renderPaymentMethod(item)}
                getStringValue={v => v.toString()}
                hideSearch={true}
            />
            {formData.paymentMethodType && TIPS_BY_PAYMENT_METHOD[formData.paymentMethodType]}
        </RowContainer>

        <FormContainer>
            {formData.paymentMethodType && PAYMENT_METHOD_FORM[formData.paymentMethodType]}
        </FormContainer>

        <InfoWithIcon
            Icon={AlertIcon}
            textColor={Color.BLUE}
            align="flex-start"
            font="body">
            Fill all fields with * to go next
        </InfoWithIcon>

        <ActionsContainer>
            <Button
                isLoading={isLoading}
                disabled={!formData.paymentMethodType}
                isWide
                onClick={handleAccept}
                styleType={ButtonStyleEnum.GREEN}>
                Next
            </Button>
            <Button
                styleType={ButtonStyleEnum.STROKE_WHITE}
                onClick={()=> dispatch(setAcceptanceStep(TaskAcceptanceStep.CONTRACT))}
                isWide>
                Back
            </Button>
        </ActionsContainer>
        </FormGrid>

    </FormGrid>
  )
}

const RowContainer = styled.div`
    display: grid;
    gap: 8px;
`
const FormContainer = styled.div`
   margin: 16px 0px;
`

const Header = styled.div`
    display: grid;
    gap: 8px;
`

const PaymentMethodContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

    svg {
        width: 20px;
        height: 20px;
    }
`;
