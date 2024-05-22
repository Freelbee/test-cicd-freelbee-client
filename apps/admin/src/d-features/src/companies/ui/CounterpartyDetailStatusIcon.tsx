import React from 'react';
import { CounterpartyDetailsStatus, CounterpartyDtoModified } from '@freelbee/entities';
import { ReactComponent as ApprovedIcon } from '@freelbee/assets/icons/counterparty-details-status/approved.svg';
import { ReactComponent as InReviewIcon } from '@freelbee/assets/icons/counterparty-details-status/in-review.svg';
import { ReactComponent as RejectedIcon } from '@freelbee/assets/icons/counterparty-details-status/rejected.svg';

interface Props {
  company: CounterpartyDtoModified;
}

export const CounterpartyDetailStatusIcon = (props: Props) => {
  const { company } = props;

  const counterpartyDetailStatusIcon = {
    [CounterpartyDetailsStatus.APPROVED]: <ApprovedIcon />,
    [CounterpartyDetailsStatus.IN_REVIEW]: <InReviewIcon />,
    [CounterpartyDetailsStatus.REJECTED]: <RejectedIcon />
  };

  return counterpartyDetailStatusIcon[company.counterpartyDetail.status];
};
