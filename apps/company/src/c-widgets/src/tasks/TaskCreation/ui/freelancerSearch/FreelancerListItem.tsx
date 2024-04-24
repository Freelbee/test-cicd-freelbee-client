import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '@freelbee/assets/icons/cross-icons/close-icon.svg';
import FreelancerListProfile from './FreelancerListProfile';
import { TaskFreelancerData } from '@company/entities';

type Props = {
  freelancer: TaskFreelancerData,
  removeFreelancer: (freelancer: TaskFreelancerData) => void;
};

export default function FreelancerListItem(props: Props) {
  const { freelancer, removeFreelancer } = props;

  return (
    <Item>
      <FreelancerListProfile freelancer={freelancer} />
      <ItemRemove onClick={() => removeFreelancer(freelancer)}>
        <ItemRemoveIcon>
          <CloseIcon />
        </ItemRemoveIcon>
      </ItemRemove>
    </Item>
  );
}

const Item = styled.div`
  background: #f1f4f4;
  height: 50px;
  border-radius: 8px;
  display: flex;
  padding: 0px 15px;
  max-width: 100%;
`;

const ItemRemove = styled.div`
  display: flex;
  padding-left: 30px;
  align-items: center;
  justify-content: center;
`;

const ItemRemoveIcon = styled.button`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  transition: 0.2s opacity;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  svg {
    fill: white;
    width: 15px;
    height: 15px;
  }
`;
