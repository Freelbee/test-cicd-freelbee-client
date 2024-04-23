'use client';

import { StepOneForm } from './ui/StepOneForm';
import { StepTwoForm } from './ui/StepTwoForm';
import { StepThreeForm } from './ui/StepThreeForm';
import { StepOneTitle } from './ui/StepOneTitle';
import { StepThreeTitle } from './ui/StepThreeTitle';
import { useState } from 'react';
import {
  BORDER_RADIUS, Breakpoint, CloseBtnSize, CloseButton, Color, FileData, mediaBreakpointDown, ModalWindow
} from '@freelbee/shared/ui-kit';
import styled, { css } from 'styled-components';
import { TaskCreation_Step, TaskCreationContext, taskRequestDtoInit } from './context/TaskCreationContext';
import { StepTwoTitle } from './ui/StepTwoTitle';
import { TaskInGroupRequest } from './interface/CreateGroupRequest';
import { TaskCreationBuilder } from './interface/TaskRequestDto';
import { useAppSelector } from '@company/features';
import { setTaskCreationModalOpened, useCreateTaskMutation, useGetCompanyQuery } from '@company/entities';
import { useDispatch } from 'react-redux';
import DateUtil from 'packages/f-shared/src/utils/date/DateUtil';
import { useGetUserQuery } from "@freelancer/entities"
import moment from "moment";

const taskCreationContent: Record<TaskCreation_Step, JSX.Element> = {
  [TaskCreation_Step.GENERAL_INFO]: <StepOneForm />,
  [TaskCreation_Step.PAYMENT_INFO]: <StepTwoForm />,
  [TaskCreation_Step.CONTRACT_INFO]: <StepThreeForm />
};

const taskCreationTitle: Record<TaskCreation_Step, JSX.Element> = {
  [TaskCreation_Step.GENERAL_INFO]: <StepOneTitle />,
  [TaskCreation_Step.PAYMENT_INFO]: <StepTwoTitle />,
  [TaskCreation_Step.CONTRACT_INFO]: <StepThreeTitle />
};

export const TaskCreationModal = () => {

  const dispatch = useDispatch();
  const isModalOpened = useAppSelector(state => state.taskCreationReducer.taskCreationModalOpened);
  const [step, setStep] = useState<TaskCreation_Step>(TaskCreation_Step.GENERAL_INFO);
  const [tasks, setTasks] = useState<TaskInGroupRequest[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<FileData[]>([]);
  const [customContractFiles, setCustomContractFiles] = useState<FileData[]>([]);

  const { data: user } = useGetUserQuery();
  const { data: company } = useGetCompanyQuery();
  const [createTask] = useCreateTaskMutation();

  const [ taskCreationBuilder, setTaskCreationBuilder ] = useState<TaskCreationBuilder>({
    ...taskRequestDtoInit,
    signature: user?.userData.signature ?? '',
  });


  const clearTaskCreator = () => {
    setTaskCreationBuilder({
      ...taskRequestDtoInit,
      signature: user?.userData.signature ?? '',
    });
    setTasks([]);
    setAttachedFiles([]);
    setCustomContractFiles([]);
    setStep(TaskCreation_Step.GENERAL_INFO);
  };

  const createOneTask = async () => {
    const formData = new FormData();
    formData.append('title', taskCreationBuilder.name);
    formData.append('deadlineAt', moment.utc(taskCreationBuilder.deadline, DateUtil.EUROPEAN_DATE_FORMAT).startOf('day').toISOString());
    formData.append('description', taskCreationBuilder.description);
    formData.append('customerId', company!.id.toString());
    // formData.append('executorId', taskCreationBuilder!.freelancers!.map((freelancer) => freelancer.id)[0]);
    formData.append('executorId', '2'); //todo::: remove, uncomment above
    formData.append('workTypeId', taskCreationBuilder!.worksType!.id!.toString());
    formData.append('price', taskCreationBuilder.price);
    formData.append('customerCurrency', taskCreationBuilder.fiatCurrency!.id.toString());
    formData.append('signature', taskCreationBuilder.signature);
    attachedFiles.forEach(fileData => formData.append('files', fileData.file));
    customContractFiles[0]?.file && formData.append('customContractFile', customContractFiles[0].file);
    return await createTask(formData).unwrap();
  };

  const closeModal = () => dispatch(setTaskCreationModalOpened(false));

  const initialData = {
    step,
    setStep,

    tasks,
    setTasks,

    attachedFiles,
    setAttachedFiles,

    customContractFiles,
    setCustomContractFiles,

    taskCreationBuilder,
    setTaskCreationBuilder,

    createOneTask,
    clearTaskCreator,
  };

  return (
    <ModalWindow
      isOpen={isModalOpened}
      onClose={closeModal}>
      <TaskCreationContext.Provider value={initialData}>
        <Container>
          <Header>
            {taskCreationTitle[step]}
            <CloseButton
              size={CloseBtnSize.L}
              styles={closeBtnStyle}
              clickHandler={closeModal}
            />
          </Header>
          {taskCreationContent[step]}
        </Container>
        {/*}*/}
      </TaskCreationContext.Provider>

    </ModalWindow>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 580px;
  min-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: ${BORDER_RADIUS.L};
  background-color: ${Color.WHITE};

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: 24px;
    gap: 24px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 16px;
    width: 100%;
    max-width: 400px;
    min-width: 300px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const closeBtnStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;
