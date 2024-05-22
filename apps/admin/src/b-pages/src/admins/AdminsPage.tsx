'use client';

import React from 'react';
import { AdminCreationForm } from '@admin/widgets';
import { PageContainer, PageTitle } from '@admin/shared';

export const AdminsPage = () => {
  return (
    <PageContainer>
      <PageTitle text="Admins" />
      <AdminCreationForm />
    </PageContainer>
  );
}
