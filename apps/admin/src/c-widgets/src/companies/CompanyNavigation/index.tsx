'use client';

import { CounterpartyDetailsStatus } from '@freelbee/entities';
import { useContext } from 'react';
import styled from 'styled-components';
import { Color, typography } from '@freelbee/shared/ui-kit';
import { CompanyNavigationContext, CompanyNavigationTab } from '@admin/features';

export function CompanyNavigation() {
  const { company, companyNavigationTab, setCompanyNavigationTab } = useContext(CompanyNavigationContext);

  const getItems = () => {
    let items = [
      {
        name: 'Primary Information',
        tab: CompanyNavigationTab.PRIMARY_INFO
      }
    ];
    if (company.counterpartyDetail.status !== CounterpartyDetailsStatus.IN_REVIEW) {
      items = items.concat([
        // {
        //   name: 'Documents',
        //   tab: CompanyNavigationTab.DOCUMENTS
        // },
        // {
        //   name: 'Methods',
        //   tab: CompanyNavigationTab.METHODS
        // }
      ]);
    }

    return items;
  };

  if (!company) return <></>;

  return (
    <Container>
      {getItems().map((item, index) => (
        <NavigationItem
          key={index}
          $selected={item.tab === companyNavigationTab}
          onClick={() => setCompanyNavigationTab(item.tab)}
        >
          {item.name}
        </NavigationItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #D7DBEB;
`;

const NavigationItem = styled.div<{ $selected: boolean }>`
  ${typography.body};
  display: flex;
  padding: 8px 16px;
  color: ${({ $selected }) => $selected ? '#3D6BE2' : Color.GRAY_600};
  border-bottom: ${({ $selected }) => $selected ? ' 2px solid #3D6BE2' : ' 2px solid transparent'};
  cursor: pointer;
`;
