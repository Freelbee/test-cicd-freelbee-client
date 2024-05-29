'use client';

import React from 'react';
import { ConfirmationCodesTable } from '@admin/widgets';
import { PageContainer, PageTitle } from '@admin/shared';

export const ConfirmationCodesPage = () => {
  return (
    <PageContainer>
      <PageTitle text="Confirmation Codes" />
      <ConfirmationCodesTable />
    </PageContainer>
  );
};
