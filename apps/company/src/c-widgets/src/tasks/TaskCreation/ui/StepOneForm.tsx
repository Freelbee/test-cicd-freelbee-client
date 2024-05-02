'use client';

import {
  Button, ButtonStyleEnum, Calendar, Color, InfoWithIcon, Input, SelectWithSearch, Text, TextArea
} from '@freelbee/shared/ui-kit';
import styled, { css } from 'styled-components';
import React, { useContext } from 'react';
import { TaskCreation_Step, TaskCreationContext, TaskCreationData } from '../context/TaskCreationContext';
import { useDataStateUpdater } from '@freelbee/shared/hooks';
import { ReactComponent as AlertIcon } from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import moment from "moment/moment";
import FreelancerSelect from './freelancerSearch/FreelancerSelect';
import DateUtil from 'packages/f-shared/src/utils/date/DateUtil';
import FileLoader from 'packages/f-shared/src/ui-kit/inputs/fileLoader/FileLoader';
import { setTaskCreationModalOpened, useGetWorksCategoriesQuery, WorksCategory, WorksType } from '@company/entities';
import { useDispatch } from 'react-redux';

export const StepOneForm = () => {
  const {
    setStep,
    taskCreationData,
    setTaskCreationData,
    attachedFiles,
    setAttachedFiles,
  } = useContext(TaskCreationContext);

  const dispatch = useDispatch();
  const {data: worksCategories = []} = useGetWorksCategoriesQuery();
  const [, setData] = useDataStateUpdater<TaskCreationData>(taskCreationData, setTaskCreationData);

  const isButtonDisabled = !taskCreationData.name || !taskCreationData.description || !taskCreationData.deadline
    || !taskCreationData.worksType || taskCreationData?.freelancers?.length === 0 || attachedFiles.some((file) => file.isError);

  return (
    <Content>
      <Input
        isRequired
        label="Name of the task"
        placeholder="Enter a name that will briefly show the essence"
        value={taskCreationData.name ?? ''}
        maxLength={100}
        setValue={(item) => setData("name", item)}
        isError={false}
      />
      <Section>
        <SelectWithSearch<WorksCategory>
          isRequired
          label='Category of work'
          placeholder='Enter or select from the dropdown list'
          searchPlaceholder='Search by works category'
          items={worksCategories}
          value={taskCreationData.worksCategory ?? null}
          setValue={(value) => {
            setData("worksCategory", value);
            setData("worksType", undefined);
          }}
          getStringValue={v => v.name}
          renderOption={(item) => <Text font='body' styles={worksText}>{item.name}</Text>}
        />
        <HiddenBlock $isHide={!taskCreationData?.worksCategory} data-ishide={!taskCreationData?.worksCategory}>
          <SelectWithSearch<WorksType>
            isRequired
            label='Type of work'
            placeholder='Click to select the job type'
            searchPlaceholder='Search by works type'
            items={taskCreationData?.worksCategory?.workTypes ?? []}
            value={taskCreationData?.worksType ?? null}
            setValue={(item) => setData("worksType", item)}
            getStringValue={v => v.name}
            renderOption={(item) => <Text font='body' styles={worksText}>{item.name}</Text>}
            isDisabled={!taskCreationData?.worksCategory}
          />
        </HiddenBlock>
      </Section>

      <TextArea
        isRequired
        label="Describe"
        placeholder="See what an excellent description of the task, take up our order!"
        value={taskCreationData?.description ?? ''}
        maxLength={100}
        noMessageSpace
        onChange={(e) => setData("description", e.target.value)}
      />

      <FileLoader
        label={'Attached files'}
        files={attachedFiles ?? []}
        setFiles={setAttachedFiles}
        fileContainerStyles={[css`max-height: 250px;`]}
        text={'Attach a file'}
        maxSizeText={'Max. file size: 5 MB'}
        borderColor={attachedFiles.length === 0 ? undefined : attachedFiles.some(file => file.isError) ? Color.DANGER : Color.EMERALD}
      />
      <Calendar
        label={'Deadline'}
        isRequired
        canClear
        minDate={moment().add(1, 'day').toDate()}
        selectedDate={moment(taskCreationData?.deadline, DateUtil.EUROPEAN_DATE_FORMAT).isValid() ? moment(taskCreationData?.deadline, DateUtil.EUROPEAN_DATE_FORMAT).toDate() : undefined}
        onSelect={(date: Date | null) => setData("deadline", date)}
      />
      <FreelancerSelect
        max={1}
        freelancers={taskCreationData?.freelancers ?? []}
        onSelect={(value) => setData("freelancers", value)}
      />

      <InfoWithIcon
        Icon={AlertIcon}
        textColor={Color.BLUE}
        align="flex-start"
        font="body"
      >
        Please fill in the fields marked with * to go next.
      </InfoWithIcon>

      <ButtonsContainer>
        <Button
          isWide
          onClick={() => setStep(TaskCreation_Step.PAYMENT_INFO)}
          disabled={isButtonDisabled}
        >
          Next
        </Button>
        <Button
          isWide
          styleType={ButtonStyleEnum.STROKE_WHITE}
          onClick={() => dispatch(setTaskCreationModalOpened(false))}
        >
          Back
        </Button>
      </ButtonsContainer>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const HiddenBlock = styled.div<{ $isHide: boolean }>`
  overflow: hidden;
  height: auto;
  max-height: 0;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);

  ${({$isHide}) => !$isHide && css`
    overflow: visible;
    max-height: 500px;
    transition: max-height 0.4s cubic-bezier(1, 0, 1, 0);
  `}
`;

const worksText = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  & > :not([data-ishide=true]):nth-child(n+2) {
    margin-top: 16px;
  }
`;
