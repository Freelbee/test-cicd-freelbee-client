'use client';

import { PersonalLayout } from '@admin/widgets';
import { AdminsPage } from '@admin/pages';

export default function Index() {
  return (
    <PersonalLayout>
      <AdminsPage />
    </PersonalLayout>
  );
}
