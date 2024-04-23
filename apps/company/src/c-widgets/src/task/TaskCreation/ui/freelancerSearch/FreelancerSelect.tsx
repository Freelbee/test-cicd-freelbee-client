import React from 'react';
import styled from 'styled-components';
import { TaskFreelancerData, tempTaskFreelancerData } from '../../interface/TaskGeneralInfoFormData';
import { SelectWithSearch } from '@freelbee/shared/ui-kit';
import FreelancerListItem from './FreelancerListItem';
import FreelancerSelectProfile from './FreelancerSelectProfile';

type Props = {
  max: number
  freelancers: TaskFreelancerData[];
  onSelect: (freelancers: TaskFreelancerData[]) => void;
};

export default function FreelancerSelect(props: Props) {
  const { max, freelancers, onSelect } = props;

  const renderFreelancer = (freelancer: TaskFreelancerData) =>
    <FreelancerItem>
      <FreelancerSelectProfile freelancer={freelancer} />
    </FreelancerItem>
  ;

  const addFreelancer = (freelancer : TaskFreelancerData) => {
    const newFreelancers = [...freelancers];
    newFreelancers.push(freelancer);
    onSelect(newFreelancers);
  };

  const removeFreelancer = (freelancer : TaskFreelancerData) => {
    onSelect(freelancers.filter((prevFreelancer) => !(prevFreelancer.email === freelancer.email && prevFreelancer.role === freelancer.role)));
  };

  return (
    <>
      <SelectWithSearch<TaskFreelancerData>
        isRequired
        label='Add freelancer'
        placeholder='Enter the name or e-mail of the freelancer'
        searchPlaceholder='Search by freelancer name or e-mail'
        items={tempTaskFreelancerData}
        value={null}
        getStringValue={f => f.firstName}
        setValue={addFreelancer}
        renderOption={renderFreelancer}
        isDisabled={freelancers.length >= max}
      />
      {freelancers.length > 0 && (
        <FreelancerListContainer>
          {freelancers.map((freelancer, index) => (
            <FreelancerListItem key={index} freelancer={freelancer} removeFreelancer={removeFreelancer}/>
          ))}
        </FreelancerListContainer>
      )}
    </>
  );
}

const FreelancerListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

const FreelancerItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 55px;
  align-items: center;
`;
