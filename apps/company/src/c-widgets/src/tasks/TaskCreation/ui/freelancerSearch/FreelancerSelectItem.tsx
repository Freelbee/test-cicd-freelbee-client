import React from 'react';
import styled, { css } from 'styled-components';
import { Color, Text } from '@freelbee/shared/ui-kit';
import { SystemStatus, TaskFreelancerData } from '../../interface/TaskFreelancerData';

const statusColor: Record<SystemStatus, Color> = {
  [SystemStatus.NEW]: Color.PLAN,
  [SystemStatus.INVITED]: Color.BLUE,
  [SystemStatus.REGISTERED]: Color.SWAMPY,
  [SystemStatus.SENT]: Color.GRAY_600,
  [SystemStatus.UNKNOWN]: Color.GRAY_600
};

type Props = {
  freelancer: TaskFreelancerData
};

export default function FreelancerSelectItem(props: Props) {
  const { freelancer } = props;

  const getStatus = (status: SystemStatus) => {
    switch (status) {
      case SystemStatus.INVITED:
        return <Text font="bodySmall" color={statusColor[status]} styles={css`padding-right: 15px;`}>
          Invited
        </Text>;
      case SystemStatus.NEW:
        return <Text font="bodySmall" color={statusColor[status]} styles={css`padding-right: 15px;`}>
          To invite
        </Text>;
      case SystemStatus.REGISTERED:
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
      <FreelancerState>{getStatus(freelancer.systemStatus)}</FreelancerState>
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
