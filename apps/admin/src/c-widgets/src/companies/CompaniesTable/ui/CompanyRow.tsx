'use client';

import { Breakpoint, Color, Text, mediaBreakpointDown, typography, vw } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { CompanyData } from '@admin/entities';
import { CounterpartyDetailStatusIcon } from '@admin/features';

interface Props {
  company: CompanyData;
}

export const CompanyRow = (props: Props) => {
  const { company } = props;

  const router = useRouter();

  const onRowClick = () => router.push(`/companies/${company.id}`);

  return (
    <Container onClick={onRowClick}>
      <Text font="bodySmall">{company.id}</Text>
      <CompanyName color={Color.GRAY_900}>{company.counterpartyDetail.props.NAME}</CompanyName>
      <Text font="bodySmall" color={Color.GRAY_600}>{'{user data}'}</Text>
      <Text font="bodySmall" color={Color.GRAY_600}>{company.counterpartyDetail.props.TIN}</Text>
      <CounterpartyDetailStatusIcon company={company} />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 0.9fr 128px;
  align-items: center;
  padding: 16px;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    gap: 8px;
    grid-template-columns: 0.8fr 1.2fr;
    border: 1px solid ${Color.GRAY_400};
    border-radius: 16px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const CompanyName = styled.span<{ color: Color }>`
  ${typography.bodySmall};
  color: ${({ color }) => color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    max-width: ${vw(280, Breakpoint.Tablet)}
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    white-space: normal;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
`;
