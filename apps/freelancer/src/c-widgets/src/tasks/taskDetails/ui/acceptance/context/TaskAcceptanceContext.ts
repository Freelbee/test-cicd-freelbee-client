'use client';

import { createContext } from "react";
import { Currency, PaymentMethodPropType, PaymentMethodType} from "@freelbee/entities";
import { ValidatorResult } from "@freelbee/features";

export type PaymentFormData = Partial<{[K in PaymentMethodPropType]: string}>;

export interface AcceptanceData {
    freelancerSignature: string;
    freelancerPaymentDetails: string;
    freelancerCurrency: Currency | null;
    paymentMethodType: PaymentMethodType | null;
};

export interface ITaskAcceptanceContext {
    resetPaymentData: () => void,
    resetFormData: () => void,
    formData: AcceptanceData;
    setFormData: (key: keyof AcceptanceData, value: unknown) => void;
    paymentFormData: PaymentFormData;
    setPaymentFormData: (key: keyof PaymentFormData, value: unknown) => void;
    validatorResult: null | ValidatorResult<PaymentFormData>;
    setValidatorResult: (result: null | ValidatorResult<PaymentFormData>) => void;
}

export const TaskAcceptanceContext = createContext<ITaskAcceptanceContext>({
    validatorResult: null,
    setValidatorResult: () => {},
    resetPaymentData: () => {},
    resetFormData: () => {},
    setFormData: () => {},
    formData: {
        freelancerSignature: "",
        freelancerPaymentDetails: "",
        freelancerCurrency: null,
        paymentMethodType: null
    },
    paymentFormData: {},
    setPaymentFormData: (key: PaymentMethodPropType, value: unknown) => {}
    });