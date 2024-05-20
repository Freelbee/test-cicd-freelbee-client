'use client';

import { PersonalLayout } from '@admin/widgets';
import { CompaniesPage } from '@admin/pages';

export default function Index() {
  return (
    <PersonalLayout>
      <CompaniesPage />
    </PersonalLayout>
  );
}
