'use client';

import { css } from 'styled-components';
import { TableHead, useGetPageOfCompanyCounterpartiesQuery } from '@admin/entities';
import { Breakpoint, Color, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { CompanyRow } from './ui/CompanyRow';

export const CompaniesTable = () => {
  const { data: companies } = useGetPageOfCompanyCounterpartiesQuery();

  return (
    <>
      <TableHead styles={headRow}>
        <Text font="body" color={Color.GRAY_700}>ID</Text>
        <Text font="body" color={Color.GRAY_700}>Company Name</Text>
        <Text font="body" color={Color.GRAY_700}>User</Text>
        <Text font="body" color={Color.GRAY_700}>Tax Code</Text>
      </TableHead>
      {companies && [...companies]
        .sort((a, b) => b.id - a.id)
        .map(company => (
          <CompanyRow key={company.id} company={company} />
        ))}
    </>
  );
};

const headRow = css`
  display: grid;
  grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 0.9fr 128px;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    display: none;
  }
`;
