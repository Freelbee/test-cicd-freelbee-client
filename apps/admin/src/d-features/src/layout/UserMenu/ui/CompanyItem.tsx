'use client';

import { BORDER_RADIUS } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import { UserBadge } from '@admin/entities';

interface Props extends HTMLAttributes<HTMLDivElement> {
  selected: boolean;
  company: {
    id: number,
    name: string,
    status: string,
  };
}

export const CompanyItem = ({ company, selected, ...rest }: Props) => {
  return (
    <Container selected={selected} {...rest}>
      <UserBadge
        avatarContent={company.name[0]}
        status={company.status}
        name={company.name}
      />
    </Container>
  );
};

const Container = styled.span<{ selected: boolean }>`
  display: flex;
  gap: 8px;
  border-radius: ${BORDER_RADIUS.S};
  box-shadow: ${({ selected }) => selected && '0 2px 2px rgb(0 0 0 / 8%)'};
`;
