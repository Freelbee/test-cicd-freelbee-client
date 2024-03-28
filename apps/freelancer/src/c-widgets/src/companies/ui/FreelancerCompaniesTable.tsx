'use client';

import { css } from "styled-components";
import { Color, Text } from "@freelbee/shared/ui-kit";
import { TableHead } from "@freelancer/entities";
import { CompanyRow } from "./CompanyRow";

export const FreelancerCompaniesTable = () => {

  // MOCK
  const companies = [
    {
      id: 1,
      name: 'Some Company Name',
      status: 'approved',
      email: 'mail.test@test.ru',
    },
    {
      id: 2,
      name: 'COMPANY 222',
      status: 'waiting',
      email: 'mail.test@test.ru',
    },
    {
      id: 3,
      name: 'Some Company Name',
      status: 'approved',
      email: 'mail.test@test.ru',
    },
    {
      id: 4,
      name: 'Some Company Name',
      status: 'approved',
      email: 'mail.test@test.ru',
    },
  ]


  return (
    <div>
      <TableHead styles={headRow}>
          <Text font='body' color={Color.GRAY_700}>Name</Text>
          <Text font='body' color={Color.GRAY_700}>Email</Text>
      </TableHead>
      {companies.map(c => (
        <CompanyRow key={c.id} company={c} />
      ))}
    </div>
  )
}

const headRow = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;