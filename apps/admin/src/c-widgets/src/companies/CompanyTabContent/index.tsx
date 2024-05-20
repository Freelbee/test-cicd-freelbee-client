import React, { useContext } from 'react';
import styled from 'styled-components';
import { CompanyTabAccounts } from './ui/CompanyTabAccounts';
import { CompanyTabMethods } from './ui/CompanyTabMethods';
import { CompanyTabPrimaryInfo } from './ui/CompanyTabPrimaryInfo';
import { CompanyTabDocuments } from './ui/CompanyTabDocuments';
import { CompanyNavigationContext, CompanyNavigationTab } from '@admin/features';

export function CompanyTabContent() {
  const { companyNavigationTab } = useContext(CompanyNavigationContext);

  return (
    <Container>
      {companyNavigationTab === CompanyNavigationTab.PRIMARY_INFO && <CompanyTabPrimaryInfo />}
      {companyNavigationTab === CompanyNavigationTab.DOCUMENTS && <CompanyTabDocuments />}
      {companyNavigationTab === CompanyNavigationTab.ACCOUNTS && <CompanyTabAccounts />}
      {companyNavigationTab === CompanyNavigationTab.METHODS && <CompanyTabMethods />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  min-height: 200px;
  gap: 20px;
`;
