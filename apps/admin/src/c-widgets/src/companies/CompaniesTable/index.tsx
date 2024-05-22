'use client';

import styled, { css } from 'styled-components';
import { useGetPageOfCompanyCounterpartiesQuery } from '@admin/entities';
import { Breakpoint, Color, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { CompanyRow } from './ui/CompanyRow';
import { useState } from 'react';
import { ReactComponent as PrevPageIcon } from '@freelbee/assets/icons/arrow-icons/arrow_prev_page.svg';
import { ReactComponent as NextPageIcon } from '@freelbee/assets/icons/arrow-icons/arrow_next_page.svg';
import { TableHead } from '@admin/shared';

export const CompaniesTable = () => {
  const [page, setPage] = useState(0);

  const { data: companiesPage } = useGetPageOfCompanyCounterpartiesQuery({ page, size: 10 });

  if (!companiesPage) return <></>;

  const companies = companiesPage.content;

  const onClickPreviousPage = () => {
    if (!companiesPage.first) {
      setPage(page - 1);
    }
  }
  const onClickNextPage = () => {
    if (!companiesPage.last) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <TableHead styles={headRow}>
        <Text font="body" color={Color.GRAY_700}>ID</Text>
        <Text font="body" color={Color.GRAY_700}>Company Name</Text>
        <Text font="body" color={Color.GRAY_700}>User</Text>
        <Text font="body" color={Color.GRAY_700}>Tax Code</Text>
      </TableHead>
      {companies && [...companies]
        .sort((a, b) => a.id - b.id)
        .map(company => (
          <CompanyRow key={company.id} company={company} />
        ))
      }
      <PageButtonsContainer>
        <Button onClick={onClickPreviousPage}><PrevPageIcon /></Button>
        <Button onClick={onClickNextPage}><NextPageIcon /></Button>
      </PageButtonsContainer>
    </>
  );
};

const headRow = css`
  display: grid;
  grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 22px;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    display: none;
  }
`;

const PageButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.div`
  border-radius: 50px;
  height: 40px;
  width: 40px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color;

  &:hover {
    background-color: #edf4f6;
  }
`;
