'use client';

import { FormEventHandler, useState } from "react";
import { toast } from 'react-toastify';
import styled from "styled-components";

import ApplicationFormValidator from "../util/ApplicationFormValidator";

import 'react-toastify/dist/ReactToastify.css';
import { ValidatorResult } from "@freelbee/features";
import { SectionId, sectionSeoText } from "@landing/entities";
import { Breakpoint, ButtonStyleEnum } from "@freelbee/shared/ui-kit";
import {
  Button
} from "@freelbee/features/common";
import { Input, TextArea} from "@freelbee/features/common";
import { LanguageType } from "@freelbee/entities";

import {FormData} from '../interface/FormData';

export const QuestionForm = () => {
    const [formData, setFormData] = useState<FormData>({email: '', message: ''});

    const validator = new ApplicationFormValidator();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

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
                body: JSON.stringify({...formData, target: sectionSeoText[SectionId.QUESTIONS_FORM]})
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
        <Form onSubmit={sendApplication}>
            <Input
                data-testid='question-form-email'
                isError={validationResult.hasError('email')}
                errorMessage={validationResult.getMessageByLanguage('email', LanguageType.EN)}
                placeholder='mail@mail.com'
                label='E-mail to contact you'
                value={formData.email}
                setValue={(val) => setFormData((prev) => ({...prev, email: val}))} />
            <TextArea
                data-testid='question-form-text'
                isError={validationResult.hasError('message')}
                errorMessage={validationResult.getMessageByLanguage('message', LanguageType.EN)}
                placeholder='Ask whatever you want'
                label='Your question'
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))} />
            <Button
                data-testid='question-form-submit'
                wideOnBreakPoint={Breakpoint.xMobile}
                styleType={ButtonStyleEnum.GREEN}
                isLoading={isLoading}
                isSuccess={isSuccess}>
                Talk to us
            </Button>
        </Form>
    );
};

const Form = styled.form`
    display: grid;
    gap: 16px;
`;
