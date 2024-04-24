import React from 'react';
import styled, { css } from 'styled-components';
import { Color, Text } from '@freelbee/shared/ui-kit';
import { TaskFreelancerData, UserDataStatus } from '@company/entities';

const statusColor: Record<UserDataStatus, Color> = {
  [UserDataStatus.IN_REVIEW]: Color.BLUE,
  [UserDataStatus.APPROVED]: Color.SWAMPY,
  [UserDataStatus.REJECTED]: Color.GRAY_600
};

type Props = {
  freelancer: TaskFreelancerData
};

export default function FreelancerSelectItem(props: Props) {
  const { freelancer } = props;

  const getStatus = (status: UserDataStatus) => {
    switch (status) {
      case UserDataStatus.IN_REVIEW:
        return <Text font="bodySmall" color={statusColor[status]} styles={css`padding-right: 15px;`}>
          Invited
        </Text>;
      case UserDataStatus.APPROVED:
        return <Text font="bodySmall" color={statusColor[status]} styles={css`padding-right: 15px;`}>
          To invite
        </Text>;
      case UserDataStatus.REJECTED:
        return <Text font="bodySmall" color={statusColor[status]} styles={css`padding-right: 15px;`}>
          Registered
        </Text>;
    }
    return null;
  };

  return (
    <FreelancerItem>
      <FreelancerUser>
        {
          freelancer.firstName && freelancer.lastName &&
          <Text font="bodySmall" styles={userName}>{freelancer.firstName} {freelancer.lastName}</Text>
        }
        {freelancer.email && <>
          <Text font="bodySmall" styles={email} color={Color.GRAY_600}>{freelancer.email}</Text>
        </>}
      </FreelancerUser>
      <FreelancerState>{getStatus(freelancer.status)}</FreelancerState>
    </FreelancerItem>
  );
}

const FreelancerItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 55px;
  align-items: center;
`;

const FreelancerUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 10px;
`;

const userName = css`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 15px;
  font-weight: 500;
`;

const email = css`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 15px;
`;

const FreelancerState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
