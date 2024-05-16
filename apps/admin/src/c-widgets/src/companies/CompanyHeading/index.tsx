'use client';

import { CompanyData, PageTitle } from '@admin/entities';
import { StatusUpdateButtons } from './ui/StatusUpdateButtons';

interface Props {
  company: CompanyData;
}

export const CompanyHeading = (props: Props) => {
  const { company } = props;

  return (
    <PageTitle text={company.counterpartyDetail.props.NAME}>
      <StatusUpdateButtons company={company} />
    </PageTitle>
  );
};
