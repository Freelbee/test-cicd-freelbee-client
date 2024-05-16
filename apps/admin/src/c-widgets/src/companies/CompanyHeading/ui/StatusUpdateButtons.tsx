'use client';

import { Breakpoint, Button, ButtonStyleEnum, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { CounterpartyStatus } from '@freelbee/entities';
import { useState } from 'react';
import { CompanyData, useSetCompanyCounterpartyStatusMutation } from '@admin/entities';
import styled from 'styled-components';

interface Props {
  company: CompanyData;
}

export const StatusUpdateButtons = (props: Props) => {
  const { company } = props;

  const [setCompanyCounterpartyStatus] = useSetCompanyCounterpartyStatusMutation();
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  const counterpartyDetailsStatus = company.counterpartyDetail.status;

  const updateStatus = (status: CounterpartyStatus) => {
    setUpdateStatusLoading(true);
    setCompanyCounterpartyStatus({ companyId: company.id, status })
      .finally(() => setUpdateStatusLoading(false));
  };

  return (
    <ButtonsContainer>
      {(counterpartyDetailsStatus === CounterpartyStatus.APPROVED || counterpartyDetailsStatus === CounterpartyStatus.IN_REVIEW) && (
        <Button
          onClick={() => updateStatus(CounterpartyStatus.REJECTED)}
          styleType={ButtonStyleEnum.RED}
          isLoading={updateStatusLoading}
        >
          Block
        </Button>
      )}
      {(counterpartyDetailsStatus === CounterpartyStatus.IN_REVIEW || counterpartyDetailsStatus === CounterpartyStatus.REJECTED) && (
        <Button
          onClick={() => updateStatus(CounterpartyStatus.APPROVED)}
          styleType={ButtonStyleEnum.GREEN}
          isLoading={updateStatusLoading}
        >
          {counterpartyDetailsStatus === CounterpartyStatus.REJECTED && 'Unblock'}
          {counterpartyDetailsStatus === CounterpartyStatus.IN_REVIEW && 'Approve'}
        </Button>
      )}
      {/*{!company && <Preloader size={PreloaderSize.Micro} />}*/}
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-left: auto;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    flex-direction: column;
    gap: 12px
  }
`;
