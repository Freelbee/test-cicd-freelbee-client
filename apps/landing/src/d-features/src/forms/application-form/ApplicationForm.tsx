'use client';

import { FormEventHandler, useState } from "react";
import { toast } from 'react-toastify';
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import 'react-toastify/dist/ReactToastify.css';
import { SectionId, sectionSeoText } from "@landing/entities";
import { ValidatorResult } from "@freelbee/features";
import { Input, PhoneNumberInput, TextArea } from "@freelbee/features/common";
import { Breakpoint, ButtonStyleEnum, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import {
  Button
} from "@freelbee/features/common";
import { LanguageType } from "@freelbee/entities";

import ApplicationFormValidator from "./util/ApplicationFormValidator";

import {FormData} from './interface/FormData';

export const ApplicationForm = () => {
    const [formData, setFormData] = useState<FormData>({email: '', phone: '', message: ''});
    const searchParams = useSearchParams();

    const validator = new ApplicationFormValidator();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const getTargetText = (): string => {
        const modalParam = searchParams.get('modal'); // Expected value = ModalQueryValue.APPLICATION + SectionId (modal=application_devices)
        if(!modalParam) return '';
        const sectionIdIdx = modalParam.indexOf('_');
        if(sectionIdIdx === -1) return '';

        const sectionId = modalParam.slice(sectionIdIdx);
        return sectionSeoText[sectionId as SectionId] ?? '';
    };

    console.log('Test hotfix')

    const sendApplication: FormEventHandler = async (e) => {
        e.preventDefault();
        const validationResult = validator.validate(formData);
        setValidationResult(validationResult);

        if(!validationResult.isSuccess()) {
            return;
        }
        try {
            setIsLoading(true);
            setIsSuccess(false);
            const res = await fetch("/api/tg_bot", {
                method: "POST",
                body: JSON.stringify({...formData, target: getTargetText()})
            });
            if(res.ok) {
                setIsSuccess(true);
            } else {
                toast("Something went wrong. Please try again later", {type: 'error'});
            }
        } catch (err) {
            toast("Something went wrong. Please try again later", {type: 'error'});
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Form onSubmit={sendApplication} >
            <Input
                data-testid={'landing-form-email'}
                isRequired
                isError={validationResult.hasError('email')}
                errorMessage={validationResult.getMessageByLanguage('email', LanguageType.EN)}
                placeholder='mail@mail.com'
                label='E-mail'
                value={formData.email}
                setValue={(val) => setFormData((prev) => ({...prev, email: val}))} />
            <PhoneNumberInput
                data-testid={'landing-form-phone'}
                label="Phone number"
                isRequired
                value={formData.phone}
                setValue={(val) => setFormData((prev) => ({...prev, phone: val}))}
            />
            <TextArea
              data-testid={'landing-form-message'}
                isRequired
                isError={validationResult.hasError('message')}
                errorMessage={validationResult.getMessageByLanguage('message', LanguageType.EN)}
                placeholder='Ask whatever you want'
                label='Your question'
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))} />
            <Button
                data-testid={'landing-form-submit'}
                styleType={ButtonStyleEnum.BLACK}
                isWide
                isLoading={isLoading}
                isSuccess={isSuccess}>
                Contact us
            </Button>
        </Form>
    );
};

const Form = styled.form`
    display: grid;
    gap: 32px;
    margin-bottom: 32px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        gap: 24px;
        margin-bottom: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        gap: 16px;
        margin-bottom: 16px;
    }
`;
