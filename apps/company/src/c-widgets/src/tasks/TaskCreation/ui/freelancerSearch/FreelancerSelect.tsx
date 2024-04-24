import React, { useState } from 'react';
import styled from 'styled-components';
import { SelectWithSearch } from '@freelbee/shared/ui-kit';
import FreelancerListItem from './FreelancerListItem';
import FreelancerSelectItem from './FreelancerSelectItem';
import { TaskFreelancerData, useFindFreelancersQuery } from '@company/entities';

type Props = {
  max: number
  freelancers: TaskFreelancerData[];
  onSelect: (freelancers: TaskFreelancerData[]) => void;
};

export default function FreelancerSelect(props: Props) {
  const { max, freelancers, onSelect } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const { data: freelancersSearchResult = [] } = useFindFreelancersQuery({ email: searchQuery });

  const addFreelancer = (freelancer : TaskFreelancerData) => {
    const newFreelancers = [...freelancers];
    newFreelancers.push(freelancer);
    onSelect(newFreelancers);
  };

  const removeFreelancer = (freelancer : TaskFreelancerData) => {
    onSelect(freelancers.filter((prevFreelancer) => !(prevFreelancer.email === freelancer.email)));
  };

  return (
    <>
      <SelectWithSearch<TaskFreelancerData>
        isRequired
        label='Add freelancer'
        placeholder='Enter the name or e-mail of the freelancer'
        searchPlaceholder='Search by freelancer name or e-mail'
        items={freelancersSearchResult}
        value={null}
        getStringValue={f => f.email}
        setValue={addFreelancer}
        renderOption={(freelancer) => <FreelancerSelectItem freelancer={freelancer} />}
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
