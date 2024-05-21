'use client';

import { Breakpoint, Color, Text, mediaBreakpointDown, typography, vw } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { CounterpartyDtoModified } from '@admin/entities';
import { CounterpartyDetailStatusIcon } from '@admin/features';

interface Props {
  company: CounterpartyDtoModified;
}

export const CompanyRow = (props: Props) => {
  const { company } = props;

  const router = useRouter();

  const onRowClick = () => router.push(`/companies/${company.id}`);

  return (
    <Container onClick={onRowClick}>
      <Text>{company.id}</Text>
      <TextWithDots>{company.counterpartyDetail.props.NAME}</TextWithDots>
      <UserDataContainer>
        <Text>ID: {company.user.userData.id}</Text>
        <Text>{company.user.userData.props.FIRST_NAME} {company.user.userData.props.LAST_NAME}</Text>
        <Text>{company.user.email}</Text>
        <Text>{company.user.phone}</Text>
      </UserDataContainer>
      <Text>{company.counterpartyDetail.props.TIN}</Text>
      <CounterpartyDetailStatusIcon company={company} />
    </Container>
  );
};

const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 40px 1.2fr 1.2fr 0.8fr 22px;
  align-items: flex-start;
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

const TextWithDots = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
