'use client';

import { PersonalLayout } from '@admin/widgets';
import { CompanyPage } from '@admin/pages';

export default function Index() {
  return (
    <PersonalLayout>
      <CompanyPage />
    </PersonalLayout>
  );
}
