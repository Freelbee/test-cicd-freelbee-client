import React from 'react';
import { CompanyData } from '@admin/entities';
import { CounterpartyStatus } from '@freelbee/entities';
import { ReactComponent as ApprovedIcon } from '@freelbee/assets/icons/counterparty-details-status/approved.svg';
import { ReactComponent as InReviewIcon } from '@freelbee/assets/icons/counterparty-details-status/in-review.svg';
import { ReactComponent as RejectedIcon } from '@freelbee/assets/icons/counterparty-details-status/rejected.svg';

interface Props {
  company: CompanyData;
}

export const CounterpartyDetailStatusIcon = (props: Props) => {
  const { company } = props;

  const counterpartyDetailStatusIcon = {
    [CounterpartyStatus.APPROVED]: <ApprovedIcon />,
    [CounterpartyStatus.IN_REVIEW]: <InReviewIcon />,
    [CounterpartyStatus.REJECTED]: <RejectedIcon />,
  };

  return counterpartyDetailStatusIcon[company.counterpartyDetail.status];
};
