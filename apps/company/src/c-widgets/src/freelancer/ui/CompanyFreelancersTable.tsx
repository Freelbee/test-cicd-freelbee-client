'use client';

import { css } from "styled-components";
import { FreelancerRow } from "./FreelancerRow";
import { TableHead } from "@company/entities";
import { Color, Text } from "@freelbee/shared/ui-kit";

export const CompanyFreelancersTable = () => {

  // MOCK
  const freelancers = [
    {
      id: 1,
      firstName: 'Testov1',
      lastName: 'Testt',
      status: 'approved',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    },
    {
      id: 2,
      firstName: '',
      lastName: '',
      status: 'invited', // как это вообще будет выглядеть ???
      email: 'mail.test@test.ru',
      phone: ''
    },
    {
      id: 3,
      firstName: 'Testov1',
      lastName: 'Testt',
      status: 'approved',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    },
    {
      id: 4,
      firstName: 'Testov2',
      lastName: 'Testt',
      status: 'approved',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    },
    {
      id: 5,
      firstName: 'TestovvV',
      lastName: 'Blalalbabla',
      status: 'approved',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    },    {
      id: 6,
      firstName: 'Testov11',
      lastName: 'Testt',
      status: 'approved',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    },
    {
      id: 7,
      firstName: 'Testov22',
      lastName: 'TesttTestovich',
      status: 'waiting',
      email: 'mail.test@test.ru',
      phone: '+79886542233'
    }
  ]


  return (
    <div>
      <TableHead styles={headRow}>
          <Text font='body' color={Color.GRAY_700}>Name</Text>
          <Text font='body' color={Color.GRAY_700}>Email</Text>
          <Text font='body' color={Color.GRAY_700}>Phone</Text>
      </TableHead>
      {freelancers.map(f => (
        <FreelancerRow key={f.id} freelancer={f} />
      ))}
    </div>
  )
}

const headRow = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
`;