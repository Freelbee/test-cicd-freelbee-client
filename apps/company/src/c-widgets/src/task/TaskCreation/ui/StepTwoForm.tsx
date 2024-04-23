'use client';

import {
  Button, ButtonStyleEnum, Checkbox, Color, Heading1, InfoWithIcon, Input, SelectWithSearch, Text
} from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import { TaskCreation_Step, TaskCreationContext } from '../context/TaskCreationContext';
import { ReactComponent as AlertIcon } from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { useDataStateUpdater } from '@freelbee/shared/hooks';
import { PaymentMethod, TaskCreationBuilder } from '../interface/TaskRequestDto';
import { testTransakFiatCurrencies, TransakFiatCurrency } from '../interface/TransakFiatCurrency';
import { ReactComponent as TransakIcon } from '@freelbee/assets/icons/payment-method/transak.svg';
import { ReactComponent as NebeusIcon } from '@freelbee/assets/icons/payment-method/nebeus.svg';
import InputWithSelect from 'packages/f-shared/src/ui-kit/inputs/inputWithSelect/InputWithSelect';

const paymentDetailsMapping = {
  [PaymentMethod.NEBEUS]: {
    infoText: 'Countries where transfers can be made: Angola; Armenia; Austria; Azerbaijan; Bahrain; Belgium; Benin; Bhutan; Botswana; Brazil; Brunei Darussalam; Bulgaria; Burkina Faso; Cambodia; Cameroon; Cape Verde; chad; Chile; Colombia; Comoros; Costa Rica; Croatia; Cyprus; Czech Republic; Denmark; Djibouti; Ecuador; El Salvador; Equatorial Guinea; Eritrea; Estonia; Eswatini; Ethiopia; Finland; France; Gabon; Gambia; Georgia; Germany; Ghana; Greece; Guinea; Guinea-Bissau; Hungary; Iceland; Israel; Italy; Japan; Kazakhstan; Kenya; Kyrgyzstan; Latvia; Lebanon; Lesotho; Liberia; Liechtenstein; Lithuania; Luxembourg; Madagascar; Malaysia; Malta; Mauritania; Mauritius; Mexico; Mongolia; Mozambique; Netherlands; Nicaragua; Norway; Panama; Paraguay; Peru; Philippines; Poland; Portugal; Dominican Republic; Republic of Ireland; Romania; Sao Tome and Principe; Saudi Arabia; Seychelles; Sierra Leone; Singapore; Slovakia; Slovenia; South Africa; South Korea; Spain; Sweden; Taiwan; Tajikistan; Thailand; Republic of Türkiye; Ukraine; United Arab Emirates; United Kingdom; Uruguay; Vietnam; Yemen Arab Republic; Zambia',
    rewardAmountPlaceholder: 'Between € 50 and € 10.000',
  },
  [PaymentMethod.TRANSAK]: {
    infoText: 'The freelancer will receive payment in crypto',
    rewardAmountPlaceholder: 'Enter the amount',
  },
};

export const StepTwoForm = () => {

  const {
    setStep,
    taskCreationBuilder,
    setTaskCreationBuilder,
  } = useContext(TaskCreationContext);

  const [, setData] = useDataStateUpdater<TaskCreationBuilder>(taskCreationBuilder, setTaskCreationBuilder);
  const [isBoxChecked, setBoxChecked] = useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const isButtonDisabled = () => !taskCreationBuilder.price || !taskCreationBuilder.fiatCurrency || !isBoxChecked || isLoading

  const renderPaymentMethod = (paymentMethod: PaymentMethod) => (
    <PaymentMethodContainer>
      {paymentMethod === PaymentMethod.NEBEUS && (
        <><NebeusIcon /><Text font={'body'} color={Color.GRAY_900}>{'Nebeus'}</Text></>
      )}
      {paymentMethod === PaymentMethod.TRANSAK && (
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

  const renderCurrency = (item: TransakFiatCurrency) => <Text font='body'>{item?.symbol?.toUpperCase() ?? ''}</Text>;

  return (
    <Content>
      <Input
        label="IBAN"
        placeholder=""
        tipsText="There is the IBAN you entered during registration. Funds will be debited from this bank account"
        // value={company.iban} //TODO::: uncomment
        value='PK69ASCM0000010110203819'
        setValue={() => null}
        disabled
      />
      <SelectWithSearch<PaymentMethod>
        label='Payment method'
        placeholder='Select from the dropdown list'
        items={Object.values(PaymentMethod)}
        value={taskCreationBuilder?.paymentMethod}
        setValue={(item) => setData("paymentMethod", item)}
        renderOption={(item) => renderPaymentMethod(item)}
        getStringValue={v => v.toString()}
        hideSearch={true}
        isDisabled={!taskCreationBuilder?.paymentMethod}
      />

      <InfoWithIcon
        Icon={AlertIcon}
        textColor={Color.BLUE}
        align="flex-start"
        font="body"
      >
        {paymentDetailsMapping[taskCreationBuilder?.paymentMethod].infoText}
      </InfoWithIcon>

      <Heading1>Payment receivers:</Heading1>
      <FreelancerBlock>
        <FreelancerAvatarBlock>
          <Text font={'body'} color={Color.GRAY_900}>{taskCreationBuilder!.freelancers![0].email[0]}</Text>
        </FreelancerAvatarBlock>
        <FreelancerDetailBlock>
          {
            taskCreationBuilder!.freelancers![0]?.lastName && taskCreationBuilder!.freelancers![0]?.firstName && (
              <Text font={'medium'}>{taskCreationBuilder!.freelancers![0]?.firstName ?? ''} {taskCreationBuilder!.freelancers![0]?.lastName ?? ''}</Text>
            )
          }
          <Text font={'bodySmall'} color={Color.GRAY_600}>{taskCreationBuilder!.freelancers![0].email}</Text>
        </FreelancerDetailBlock>
      </FreelancerBlock>
      <PaymentContainer>
        <InputWithSelect<TransakFiatCurrency>
          label='Reward amount'
          placeholder={paymentDetailsMapping[taskCreationBuilder?.paymentMethod].rewardAmountPlaceholder}
          items={testTransakFiatCurrencies}
          value={taskCreationBuilder.price}
          defaultItem={taskCreationBuilder.fiatCurrency}
          watchValue={taskCreationBuilder.fiatCurrency}
          setItem={(value) => setData("fiatCurrency", value)}
          setValue={(value) => setData("price", value)}
          renderItem={renderCurrency}
          search={(item, value) => item.symbol.toUpperCase().includes(value.toUpperCase())}
          searchStringValue={(item) => item.symbol}
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
            disabled={isButtonDisabled()}
            isLoading={isLoading}
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
