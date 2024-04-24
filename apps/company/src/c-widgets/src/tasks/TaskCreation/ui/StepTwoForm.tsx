'use client';

import { Button, ButtonStyleEnum, Checkbox, Color, Heading1, InfoWithIcon, Input, SelectWithSearch, Text } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import { TaskCreation_Step, TaskCreationContext, TaskCreationData } from '../context/TaskCreationContext';
import { ReactComponent as AlertIcon } from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { useDataStateUpdater } from '@freelbee/shared/hooks';
import { ReactComponent as TransakIcon } from '@freelbee/assets/icons/payment-method/transak.svg';
import { ReactComponent as NebeusIcon } from '@freelbee/assets/icons/payment-method/nebeus.svg';
import InputWithSelect from 'packages/f-shared/src/ui-kit/inputs/inputWithSelect/InputWithSelect';
import { Currency, PaymentProviderName, useGetCompanyQuery, useGetCurrenciesQuery } from '@company/entities';

export const StepTwoForm = () => {
  const {
    setStep,
    taskCreationData,
    setTaskCreationData,
  } = useContext(TaskCreationContext);

  const { data: company } = useGetCompanyQuery();
  const { data: currenciesNebeus = [] } = useGetCurrenciesQuery(PaymentProviderName.NEBEUS);
  const { data: currenciesTransak = [] } = useGetCurrenciesQuery(PaymentProviderName.TRANSAK);
  const [, setData] = useDataStateUpdater<TaskCreationData>(taskCreationData, setTaskCreationData);
  const [isBoxChecked, setBoxChecked] = useState(false);

  const paymentDetailsMapping = {
    [PaymentProviderName.NEBEUS]: {
      currencies: currenciesNebeus,
      rewardAmountPlaceholder: 'Between € 50 and € 10.000',
      infoText: 'Countries where transfers can be made: Angola; Armenia; Austria; Azerbaijan; Bahrain; Belgium; Benin; Bhutan; Botswana; Brazil; Brunei Darussalam; Bulgaria; Burkina Faso; Cambodia; Cameroon; Cape Verde; chad; Chile; Colombia; Comoros; Costa Rica; Croatia; Cyprus; Czech Republic; Denmark; Djibouti; Ecuador; El Salvador; Equatorial Guinea; Eritrea; Estonia; Eswatini; Ethiopia; Finland; France; Gabon; Gambia; Georgia; Germany; Ghana; Greece; Guinea; Guinea-Bissau; Hungary; Iceland; Israel; Italy; Japan; Kazakhstan; Kenya; Kyrgyzstan; Latvia; Lebanon; Lesotho; Liberia; Liechtenstein; Lithuania; Luxembourg; Madagascar; Malaysia; Malta; Mauritania; Mauritius; Mexico; Mongolia; Mozambique; Netherlands; Nicaragua; Norway; Panama; Paraguay; Peru; Philippines; Poland; Portugal; Dominican Republic; Republic of Ireland; Romania; Sao Tome and Principe; Saudi Arabia; Seychelles; Sierra Leone; Singapore; Slovakia; Slovenia; South Africa; South Korea; Spain; Sweden; Taiwan; Tajikistan; Thailand; Republic of Türkiye; Ukraine; United Arab Emirates; United Kingdom; Uruguay; Vietnam; Yemen Arab Republic; Zambia',
    },
    [PaymentProviderName.TRANSAK]: {
      currencies: currenciesTransak,
      rewardAmountPlaceholder: 'Enter the amount',
      infoText: 'The freelancer will receive payment in crypto',
    },
  };

  const renderPaymentMethod = (paymentMethod: PaymentProviderName) => (
    <PaymentMethodContainer>
      {paymentMethod === PaymentProviderName.NEBEUS && (
        <><NebeusIcon /><Text font={'body'} color={Color.GRAY_900}>{'Nebeus'}</Text></>
      )}
      {paymentMethod === PaymentProviderName.TRANSAK && (
        <>
          <TransakIcon />
          <div>
            <Text font={'body'} color={Color.GRAY_900}>Transak</Text>
            <Text font={'body'} color={Color.GRAY_600}>{' '} · Crypto</Text>
          </div>
        </>
      )}
    </PaymentMethodContainer>
  );

  const isButtonDisabled = !taskCreationData.price || !taskCreationData.currency || !isBoxChecked;

  const renderCurrency = (item: Currency) => <Text font='body'>{item?.code?.toUpperCase() ?? ''}</Text>;

  return (
    <Content>
      <Input
        label="IBAN"
        placeholder=""
        tipsText="There is the IBAN you entered during registration. Funds will be debited from this bank account"
        value={company!.counterpartyDetail.iban}
        setValue={() => null}
        disabled
      />
      <SelectWithSearch<PaymentProviderName>
        label='Payment method'
        placeholder='Select from the dropdown list'
        items={Object.values(PaymentProviderName)}
        value={taskCreationData?.paymentProviderName}
        setValue={(item) => {
          setData('paymentProviderName', item);
          setData('currency', null);
        }}
        renderOption={(item) => renderPaymentMethod(item)}
        getStringValue={v => v.toString()}
        hideSearch={true}
        isDisabled={!taskCreationData?.paymentProviderName}
      />

      <InfoWithIcon
        Icon={AlertIcon}
        textColor={Color.BLUE}
        align="flex-start"
        font="body"
      >
        {paymentDetailsMapping[taskCreationData?.paymentProviderName].infoText}
      </InfoWithIcon>

      <Heading1>Payment receivers:</Heading1>
      <FreelancerBlock>
        <FreelancerAvatarBlock>
          <Text font={'body'} color={Color.GRAY_900}>{taskCreationData!.freelancers![0].email[0]}</Text>
        </FreelancerAvatarBlock>
        <FreelancerDetailBlock>
          {
            taskCreationData!.freelancers![0]?.lastName && taskCreationData!.freelancers![0]?.firstName && (
              <Text font={'medium'}>{taskCreationData!.freelancers![0]?.firstName ?? ''} {taskCreationData!.freelancers![0]?.lastName ?? ''}</Text>
            )
          }
          <Text font={'bodySmall'} color={Color.GRAY_600}>{taskCreationData!.freelancers![0].email}</Text>
        </FreelancerDetailBlock>
      </FreelancerBlock>
      <PaymentContainer>
        <InputWithSelect<Currency>
          label='Reward amount'
          placeholder={paymentDetailsMapping[taskCreationData.paymentProviderName].rewardAmountPlaceholder}
          items={paymentDetailsMapping[taskCreationData.paymentProviderName].currencies}
          value={taskCreationData.price}
          defaultItem={taskCreationData.currency}
          watchValue={taskCreationData.currency}
          setItem={(value) => setData("currency", value)}
          setValue={(value) => setData("price", value)}
          renderItem={renderCurrency}
          search={(item, value) => item.code.toUpperCase().includes(value.toUpperCase())}
          searchStringValue={(item) => item.code}
        />
        <InfoWithIcon
          Icon={AlertIcon}
          textColor={Color.BLUE}
          align="flex-start"
          font="body"
        >
          Commission depends on the method chosen by freelancer
        </InfoWithIcon>
      </PaymentContainer>

      <Section>
        <TermsAgreementContainer>
          <Checkbox
            isCheck={isBoxChecked}
            onChange={() => setBoxChecked((isBoxChecked) => !isBoxChecked)}
          />
          <Text font="body">
            By checking the box, I confirm that the general information and payment details are filled out correctly
          </Text>
        </TermsAgreementContainer>

        <ButtonsContainer>
          <Button
            isWide
            disabled={isButtonDisabled}
            onClick={() => setStep(TaskCreation_Step.CONTRACT_INFO)}
          >
            Next
          </Button>
          <Button
            isWide
            styleType={ButtonStyleEnum.STROKE_WHITE}
            onClick={() => setStep(TaskCreation_Step.GENERAL_INFO)}
          >
            Back
          </Button>
        </ButtonsContainer>
      </Section>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const TermsAgreementContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FreelancerBlock = styled.div`
  display: flex;
  gap: 8px;
`;

const FreelancerAvatarBlock = styled.div`
  display: flex;
  min-width: 44px;
  height: 44px;
  padding: 9.5px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 110px;
  background: ${Color.GRAY_400};
`;

const FreelancerDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
    justify-content: center;
  gap: 2px;
`;

const PaymentContainer = styled.div`
    display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PaymentMethodContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;
