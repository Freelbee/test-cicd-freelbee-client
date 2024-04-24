import React from 'react';
import styled from 'styled-components';
import { Color, Text, typography } from '@freelbee/shared/ui-kit';
import { TaskFreelancerData } from '../../interface/TaskFreelancerData';

type Props = {
  freelancer: TaskFreelancerData
};

export default function FreelancerListProfile(props: Props) {
  const { freelancer } = props;

  return (
    <ItemInfo>
      {freelancer.firstName && freelancer.lastName && (
        <Text font="body">{freelancer.firstName} {freelancer.lastName}</Text>
      )}
      <ItemEmail>
        {freelancer.email}
      </ItemEmail>
    </ItemInfo>
  );
}

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: calc(100% - 42px);
`;

const ItemEmail = styled.div`
  ${typography.default};
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 15px;
  padding-top: 2px;
  font-size: 12px;
  color: ${Color.GRAY_600};
`;

