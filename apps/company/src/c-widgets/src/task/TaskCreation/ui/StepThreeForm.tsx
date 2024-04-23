'use client';

import {
  Button,
  ButtonStyleEnum,
  Checkbox,
  Color,
  Heading3,
  Input,
  SelectWithSearch,
  Text
} from '@freelbee/shared/ui-kit';
import styled, { css } from 'styled-components';
import React, { useContext, useState } from 'react';
import { TaskCreation_Step, TaskCreationContext } from '../context/TaskCreationContext';
import { ReactComponent as DownloadIcon } from '@freelbee/assets/icons/download/download.svg';
import { useDataStateUpdater } from '@freelbee/shared/hooks';
import { TaskCreationBuilder } from '../interface/TaskRequestDto';
import FileLoader from 'packages/f-shared/src/ui-kit/inputs/fileLoader/FileLoader';
import { setTaskCreationModalOpened } from '@company/entities';
import { useDispatch } from 'react-redux';

enum ContractType {
  STANDARD = 'STANDARD',
  CUSTOM = 'CUSTOM'
}

const contractTypeMapping = {
  [ContractType.STANDARD]: {
    optionText: 'Standard service agreement',
    checkboxText: 'By checking the box, I agree with the terms and conditions of the Contract. All the data I\'ve provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described',
    isWithCustomContractFiles: false,
    isWithDownloadAgreement: true,
    isWithFreelbeeSignature: true,
  },
  [ContractType.CUSTOM]: {
    optionText: 'I\'ll upload my own',
    checkboxText: 'By putting a tick in the box, I agree with the terms and conditions of the downloaded text of the Contract. I guarantee, that all the data I\'ve provided in this Task form is correct and fully comply with the downloaded text of the Contract. In case of any contradictions between the data provided in the Task form and in the text of the downloaded Contract, the data provided in the Task form shall prevail.  For the sake of clearence for settlement purposes Freelbee shall use only the data provided in the Task form',
    isWithCustomContractFiles: true,
    isWithDownloadAgreement: false,
    isWithFreelbeeSignature: false,
  },
};

export const StepThreeForm = () => {

  const {
    setStep,
    taskCreationBuilder,
    setTaskCreationBuilder,
    customContractFiles,
    setCustomContractFiles,
    createOneTask,
    clearTaskCreator
  } = useContext(TaskCreationContext);

  const dispatch = useDispatch();
  const [, setData] = useDataStateUpdater<TaskCreationBuilder>(taskCreationBuilder, setTaskCreationBuilder);
  const [contractType, setContractType] = useState<ContractType>(ContractType.STANDARD);
  const [isBoxChecked, setBoxChecked] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isDisabled = !isBoxChecked || (contractType === ContractType.STANDARD && !taskCreationBuilder.signature) || (contractType === ContractType.CUSTOM && customContractFiles.length === 0) || isLoading;

  const createTask = () => { //todo::: consider adding 'async'
    setIsLoading(true);
    createOneTask()
      .then(()=>{
        clearTaskCreator();
        dispatch(setTaskCreationModalOpened(false));
      })
      .finally(()=> setIsLoading(false));
  };

  return (
    <Content>
      <SelectWithSearch<ContractType>
        label='Select agreement type'
        placeholder=''
        items={Object.values(ContractType)}
        value={contractType}
        setValue={(item) => {
          setCustomContractFiles([]);
          setContractType(item);
        }}
        renderOption={(item) => (<Text font="body">{contractTypeMapping[item].optionText}</Text>)}
        getStringValue={value => contractTypeMapping[value].optionText}
        hideSearch={true}
      />

      {contractTypeMapping[contractType].isWithDownloadAgreement && (
        <AgreementFileContainer>
          <Heading3 color={Color.GRAY_900}>Agreement</Heading3>
          <DownloadContainer onClick={() => {}}>{/*//TODO::: fix*/}
            <DownloadIconStyled />
            <Text font={'body'} color={Color.BLUE}>Download agreement</Text>
          </DownloadContainer>
        </AgreementFileContainer>
      )}

      {contractTypeMapping[contractType].isWithCustomContractFiles && (
        <FileLoader
          multiply={false}
          label={'Attached files'}
          files={customContractFiles ?? []}
          setFiles={setCustomContractFiles}
          fileContainerStyles={[css`max-height: 250px;`]}
          text={'Attach a file'}
          maxSizeText={'Max. file size: 5 MB'}
          borderColor={customContractFiles.length === 0 ? undefined : customContractFiles.some(el => el.isError) ? Color.DANGER : Color.EMERALD}
        />
      )}

      {contractTypeMapping[contractType].isWithFreelbeeSignature && (
        <Input
            label="Signature"
            placeholder="Enter signature"
            value={taskCreationBuilder?.signature ?? ''}
            setValue={(v) => setData("signature", v)}
          />
      )}

      <TermsAgreementContainer>
        <Checkbox
          isCheck={isBoxChecked}
          onChange={() => setBoxChecked((isBoxChecked) => !isBoxChecked)}
        />
        <Text font='body'>{contractTypeMapping[contractType].checkboxText}</Text>
      </TermsAgreementContainer>

      <ButtonsContainer>
        <Button
          isWide
          styleType={ButtonStyleEnum.GREEN}
          disabled={isDisabled}
          isLoading={isLoading}
          onClick={createTask}
        >
          Sign and create
        </Button>
        <Button
          isWide
          styleType={ButtonStyleEnum.STROKE_WHITE}
          onClick={() => setStep(TaskCreation_Step.PAYMENT_INFO)}
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

const AgreementFileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DownloadContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

const TermsAgreementContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const DownloadIconStyled = styled(DownloadIcon)`
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  object-fit: contain;
`
