'use client';

import { PageContainer, useGetCompanyCounterpartyQuery } from '@admin/entities';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CompanyHeading } from '@admin/widgets';

export const CompanyPage = () => {

  const params = useParams();
  const [companyId, setCompanyId] = useState<number>();

  const { data: company } = useGetCompanyCounterpartyQuery(companyId, { skip: !companyId });

  useEffect(() => {
    setCompanyId(params.id);
  }, [params, companyId]);

  return (
    <PageContainer>
      {company && <CompanyHeading company={company} />}
    </PageContainer>
  );
};
