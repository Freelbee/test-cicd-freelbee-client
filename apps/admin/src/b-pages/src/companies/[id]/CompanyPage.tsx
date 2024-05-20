'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageContainer, useGetCompanyCounterpartyQuery } from '@admin/entities';
import { CompanyHeading, CompanyTabContent } from '@admin/widgets';
import { CompanyNavigationContext, CompanyNavigationTab } from '@admin/features';

export const CompanyPage = () => {
  const params = useParams();
  const [companyId, setCompanyId] = useState<number>();
  const [companyNavigationTab, setCompanyNavigationTab] = useState(CompanyNavigationTab.PRIMARY_INFO);

  const { data: company } = useGetCompanyCounterpartyQuery(companyId ?? 0, { skip: !companyId });

  useEffect(() => {
    setCompanyId(Number(params.id));
  }, [params, companyId]);

  if (!company) return <></>;

  return (
    <CompanyNavigationContext.Provider value={{ company, companyNavigationTab, setCompanyNavigationTab }}>
      <PageContainer>
        <CompanyHeading />
        <CompanyTabContent />
      </PageContainer>
    </CompanyNavigationContext.Provider>
  );
};
