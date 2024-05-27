'use client';

import { Button, Color, FileData, FileLoader, InfoWithIcon } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState} from "react";
import styled, { css } from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { useCreateCompanyDocumentsMutation} from "@company/entities";
import { DocumentsData } from "../interface/DocumentsData";
import { CompanyDocumentType } from "../interface/CompanyDocumentTypeEnum";
import { DocumentsDataValidator } from "../util/DocumentsDataValidator";

export const DocumentsForm = () => {

    const {setStep} = useContext(OnboardingContext);
    const [createCompanyDocuments, {isLoading}] = useCreateCompanyDocumentsMutation();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<DocumentsData>());
    const validator = new DocumentsDataValidator();
    const [registration, setRegistration] = useState<Array<FileData>>([]);
    const [address, setAddress] = useState<Array<FileData>>([]);
    const [shareholderRegistry, setShareholderRegistry] = useState<Array<FileData>>([]);
    const [directorRegistry, setDirectorRegistry] = useState<Array<FileData>>([]);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const files = {
          [CompanyDocumentType.REGISTRATION]: registration[0],
          [CompanyDocumentType.ADDRESS]: address[0],
          [CompanyDocumentType.SHAREHOLDER_REGISTRY]: shareholderRegistry[0],
          [CompanyDocumentType.DIRECTOR_REGISTRY]:  directorRegistry[0],
        }

        const validationResult = validator.validate(files);
        setValidationResult(validationResult);

        if(!validationResult.isSuccess()) {
            return;
        }

        const formData = new FormData();

        formData.append(CompanyDocumentType.REGISTRATION, files[CompanyDocumentType.REGISTRATION].file);
        formData.append(CompanyDocumentType.ADDRESS, files[CompanyDocumentType.ADDRESS].file);
        formData.append(CompanyDocumentType.SHAREHOLDER_REGISTRY, files[CompanyDocumentType.SHAREHOLDER_REGISTRY].file);
        formData.append(CompanyDocumentType.DIRECTOR_REGISTRY, files[CompanyDocumentType.DIRECTOR_REGISTRY].file);

        createCompanyDocuments(formData).unwrap()
        .then(() => {
            setStep(Onboarding_Step.PAYMENT_DATA);
        })
        .catch(e => {})
    }

    const checkIfButtonDisabled = () => !registration[0]|| !address[0] || !shareholderRegistry[0] || !directorRegistry[0];

  return (
    <Form onSubmit={submitHandler}>
        <FileLoader
          multiply={false}
          label='Certificate of incorporation/registration'
          isRequired
          files={registration}
          setFiles={setRegistration}
          fileContainerStyles={[css`max-height: 250px;`]}
          text={'Attach a file'}
          maxSizeText={'Max. file size: 15 MB'}
          isError={validationResult.hasError(CompanyDocumentType.REGISTRATION)}
        />

        <FileLoader
          multiply={false}
          label='Proof of address, Statement of information'
          isRequired
          files={address}
          setFiles={setAddress}
          fileContainerStyles={[css`max-height: 250px;`]}
          text={'Attach a file'}
          maxSizeText={'Max. file size: 15 MB'}
          isError={validationResult.hasError(CompanyDocumentType.ADDRESS)}
        />

        <FileLoader
          multiply={false}
          label='Shareholder registry'
          isRequired
          files={shareholderRegistry}
          setFiles={setShareholderRegistry}
          fileContainerStyles={[css`max-height: 250px;`]}
          text={'Attach a file'}
          maxSizeText={'Max. file size: 15 MB'}
          isError={validationResult.hasError(CompanyDocumentType.SHAREHOLDER_REGISTRY)}
        />

        <FileLoader
          multiply={false}
          label='Director registry'
          isRequired
          files={directorRegistry}
          setFiles={setDirectorRegistry}
          fileContainerStyles={[css`max-height: 250px;`]}
          text={'Attach a file'}
          maxSizeText={'Max. file size: 15 MB'}
          isError={validationResult.hasError(CompanyDocumentType.DIRECTOR_REGISTRY)}
        />

        <InfoWithIcon
            Icon={AlertIcon}
            textColor={Color.BLUE}
            align='flex-start'
            font='body'>
            Add all requierd documents to go next
        </InfoWithIcon>

        <Button
            type="submit"
            isLoading={isLoading}
            isWide
            disabled={checkIfButtonDisabled()}
            >Next</Button>
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;
