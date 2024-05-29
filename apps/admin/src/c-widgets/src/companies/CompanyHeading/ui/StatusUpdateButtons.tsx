'use client';

import { Breakpoint, Button, ButtonStyleEnum, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { CounterpartyDetailsStatus } from '@freelbee/entities';
import { useContext, useState } from 'react';
import { useSetCompanyCounterpartyStatusMutation } from '@admin/entities';
import styled from 'styled-components';
import { CompanyNavigationContext } from '@admin/features';

export const StatusUpdateButtons = () => {
  const { company } = useContext(CompanyNavigationContext);
  const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

  const [setCompanyCounterpartyStatus] = useSetCompanyCounterpartyStatusMutation();

  const counterpartyDetailsStatus = company.counterpartyDetail.status;

  const updateStatus = (status: CounterpartyDetailsStatus) => {
    setUpdateStatusLoading(true);
    setCompanyCounterpartyStatus({ companyId: company.id, status })
      .finally(() => setUpdateStatusLoading(false));
  };

  return (
    <ButtonsContainer>
      {(counterpartyDetailsStatus === CounterpartyDetailsStatus.APPROVED || counterpartyDetailsStatus === CounterpartyDetailsStatus.IN_REVIEW) && (
        <Button
          onClick={() => updateStatus(CounterpartyDetailsStatus.REJECTED)}
          styleType={ButtonStyleEnum.RED}
          isLoading={updateStatusLoading}
        >
          Block
        </Button>
      )}
      {(counterpartyDetailsStatus === CounterpartyDetailsStatus.IN_REVIEW || counterpartyDetailsStatus === CounterpartyDetailsStatus.REJECTED) && (
        <Button
          onClick={() => updateStatus(CounterpartyDetailsStatus.APPROVED)}
          styleType={ButtonStyleEnum.GREEN}
          isLoading={updateStatusLoading}
        >
          {counterpartyDetailsStatus === CounterpartyDetailsStatus.REJECTED && 'Unblock'}
          {counterpartyDetailsStatus === CounterpartyDetailsStatus.IN_REVIEW && 'Approve'}
        </Button>
      )}
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
