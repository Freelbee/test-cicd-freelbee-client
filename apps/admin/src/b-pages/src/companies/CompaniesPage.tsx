import { PageContainer, PageTitle } from '@admin/shared';
import { CompaniesTable } from '@admin/widgets';
import React from 'react';

export const CompaniesPage = () => {
  return (
    <PageContainer>
      <PageTitle text="Companies" />
      <CompaniesTable />
    </PageContainer>
  );
};
