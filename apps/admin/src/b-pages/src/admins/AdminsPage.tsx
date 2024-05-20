'use client';

import React from 'react';
import { PageContainer, PageTitle } from '@admin/entities';
import { AdminCreationForm } from '@admin/widgets';

export const AdminsPage = () => {
  return (
    <PageContainer>
      <PageTitle text="Admins" />
      <AdminCreationForm />
    </PageContainer>
  );
}
