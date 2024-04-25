import { PaymentMethodProps, PaymentMethodType } from "@freelbee/entities";

export interface TaskAcceptanceDto {
    contractId: number;
    freelancerCounterpartyId: number;
    freelancerSignature: string;
    freelancerPaymentDetails: string;
    freelancerCurrencyId: number;
    taskId: number;
    paymentMethodType: PaymentMethodType;

    receiverPaymentMethodProps: PaymentMethodProps;
}