import { PageTitle } from '@admin/entities';
import { StatusUpdateButtons } from './ui/StatusUpdateButtons';
import React, { useContext } from 'react';
import { CompanyNavigationContext, CounterpartyDetailStatusIcon } from '@admin/features';
import styled from 'styled-components';
import { PreviousPageButton } from './ui/PreviousPageButton';

export const CompanyHeading = () => {
  const { company } = useContext(CompanyNavigationContext);

  return (
      <PageTitle
        text={(
          <CompanyNameContainer>
            <PreviousPageButton />
            {company.counterpartyDetail.props.NAME}
            <CounterpartyDetailStatusIcon company={company} />
          </CompanyNameContainer>
        )}
      >
        <StatusUpdateButtons />
      </PageTitle>
  );
};

const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
