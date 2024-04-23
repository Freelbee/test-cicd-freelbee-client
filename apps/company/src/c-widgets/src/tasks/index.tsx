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

  const [step, setStep] = useState<TaskCreation_Step>(TaskCreation_Step.GENERAL_INFO);
  const [isModalOpened, setModalOpened] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskInGroupRequest[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<FileData[]>([]);
  const [contractFiles, setContractFiles] = useState<FileData[]>([]);

  // const {data: user} = useAppSelector((state) => state.userSlice);
  // const { company } = useEntityCompany();

  const [ taskCreationBuilder, setTaskCreationBuilder,] = useState<TaskCreationBuilder>({
    ...taskRequestDtoInit,
    // signature: user.signature ?? '',
    // companyId: company.id,
  });

  // const [createTask] = useCreateTaskMutation();

  const clearTaskCreator = () => {
    setTaskCreationBuilder({
      ...taskRequestDtoInit,
      // signature: user.signature ?? '',
      // companyId: company.id
    });
    setTasks([]);
    setAttachedFiles([]);
    setContractFiles([]);
    setStep(TaskCreation_Step.GENERAL_INFO);
  };

  // const createOneTask = async () => {
  //   const customContractFile = (()=>{
  //     if (contractFiles?.length === 0) return undefined;
  //     return {
  //       name: contractFiles[0].name,
  //       payload: contractFiles[0].payload,
  //     };
  //   })();
  //   const worksTypeId = taskCreationBuilder!.worksType!.id!;
  //   const freelancers = taskCreationBuilder!.freelancers;
  //   const fiatCurrency = taskCreationBuilder!.fiatCurrency;
  //
  //   const taskCreateBuilderTmp = {...taskCreationBuilder};
  //   delete taskCreateBuilderTmp!.worksType;
  //   delete taskCreateBuilderTmp!.worksCategory;
  //   delete taskCreateBuilderTmp!.freelancers;
  //   delete taskCreateBuilderTmp!.fiatCurrency;
  //
  //   const requestData:TaskRequestDto = {
  //     ...taskCreateBuilderTmp,
  //     worksTypeId,
  //     freelancerEmail: freelancers!.map((freelancer) => freelancer.email)[0]!,
  //     deadline: moment.utc(taskCreationBuilder.deadline, DateUtil.EUROPEAN_DATE_FORMAT).startOf('day').toISOString(),
  //     companyId: company.id,
  //     fiatCurrencyId: fiatCurrency!.id!,
  //     attachedFiles: attachedFiles.map((file) => ({
  //       name: file.name,
  //       payload: file.payload,
  //     })),
  //     attributeValues: [],
  //     customContractFile
  //   };
  //   return await createTask(requestData).unwrap();
  // };

  const initialData = {
    isModalOpened,
    setModalOpened,

    step,
    setStep,

    tasks,
    setTasks,

    attachedFiles,
    setAttachedFiles,

    contractFiles,
    setContractFiles,

    taskCreationBuilder,
    setTaskCreationBuilder,

    // createOneTask,
    clearTaskCreator,
  };

  const closeModal = () => {
    setModalOpened(false);
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
