'use client';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store';
import {
  setDetailsOpen,
  useCreatePaymentDataMutation,
  useEventTransakTaskStatusMutation,
  useGetCompanyCounterpartyQuery,
  useGetPaymentDataQuery,
  useGetUserQuery,
  useSetTaskStatusMutation,
  useTransakWidget
} from '@company/entities';
import { CounterpartyDetailsStatus, PaymentProviderName, TaskCounterpartyDataDto, TaskStatus } from '@freelbee/entities';
import { ActionsContainer } from './ActionsContainer';
import { Button, ButtonStyleEnum } from '@freelbee/shared/ui-kit';
import { useEffect, useState } from 'react';
import { Transak, TransakConfig } from '@transak/transak-sdk';

export default function TaskWaitingForPaymentActions() {

  const dispatch = useDispatch();
  const { displayedTask } = useAppSelector(state => state.taskSliceReducer);
  const { data: user } = useGetUserQuery();
  const { data: company } = useGetCompanyCounterpartyQuery();
  const [setTaskStatus] = useSetTaskStatusMutation();
  const { data: taskPaymentData } = useGetPaymentDataQuery({ taskId: displayedTask?.taskId ?? 0 }, { skip: !displayedTask?.taskId });
  const [createPaymentData] = useCreatePaymentDataMutation();

  const isButtonPayHidden = taskPaymentData?.paymentProviderName === PaymentProviderName.NEBEUS && taskPaymentData.payments.length > 0;

  const onClickPay = () => {
    if (!taskPaymentData) return;
    if (taskPaymentData.payments.length === 0) {
      createPaymentData({ paymentDataId: taskPaymentData!.id });
    }
    if (taskPaymentData.paymentProviderName !== PaymentProviderName.TRANSAK) return;
    if (process.env['NEXT_PUBLIC_MODE'] === 'test') {
      handleSetStatus(TaskStatus.PAID);
    } else {
      setTaskForPayment(displayedTask);
    }
  }

  const handleSetStatus = (status: TaskStatus) => {
    if (!displayedTask) return;
    setTaskStatus({ taskId: displayedTask.taskId, status })
      .unwrap()
      .then(() => dispatch(setDetailsOpen(false)));
  };

  // TRANSAK
  const transak = useTransakWidget();
  const [client, setClient] = useState<Transak | null>(null);
  const [taskForPayment, setTaskForPayment] = useState<TaskCounterpartyDataDto | null>(null);
  const [eventAboutTaskStatus] = useEventTransakTaskStatusMutation();

  useEffect(() => {
    if (!taskForPayment || taskPaymentData?.paymentProviderName !== PaymentProviderName.TRANSAK) return;
    initialTransakPayment();
    return () => client?.close();
  }, [taskForPayment, taskPaymentData]);

  const initialTransakPayment = async () => {
    if (!taskPaymentData || taskPaymentData.payments.length === 0) return;

    const payment = taskPaymentData.payments[0];
    const cryptoData = taskPaymentData.receiverCurrency;
    const companyFiatCurrency = taskPaymentData.payerCurrency;
    const companyAmountInFiat = Number(taskPaymentData.payerAmount);
    const freelancerCryptoWalletAddress = taskPaymentData.receiverPaymentMethod.props.CRYPTO_WALLET_ADDRESS;

    const client = transak({
      exchangeScreenTitle: 'Payment information',

      fiatCurrency: companyFiatCurrency.code,
      fiatAmount: companyAmountInFiat,

      network: cryptoData.blockchainNetwork,
      cryptoCurrencyCode: cryptoData.code,
      walletAddress: freelancerCryptoWalletAddress,
      disableWalletAddressForm: true,
      // walletRedirection: true,

      partnerOrderId: `${payment.id}`,
      email: user!.email
      // email: 'lee1699@list.ru',
    } as TransakConfig);

    setClient(client);
    client.init();
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      client.close();
      setTaskForPayment(null);
    });
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, async (data) => eventAboutTaskStatus(data as string));
    Transak.on('*', (data) => console.log(data));
  };

  return (
    <>
      <ActionsContainer>
        <Button
          disabled={company?.counterpartyDetail.status !== CounterpartyDetailsStatus.APPROVED || isButtonPayHidden}
          isWide
          styleType={ButtonStyleEnum.GREEN}
          onClick={() => onClickPay()}
        >
          Pay
        </Button>
      </ActionsContainer>
    </>
  );
}
