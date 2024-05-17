'use client';

import { PageContainer, PageTitle } from '@admin/entities';
import React from 'react';
import { ConfirmationCodesTable } from '@admin/widgets';

export const ConfirmationCodesPage = () => {
  return (
    <PageContainer>
      <PageTitle text="Confirmation Codes" />
      <ConfirmationCodesTable />
    </PageContainer>
  )
}
