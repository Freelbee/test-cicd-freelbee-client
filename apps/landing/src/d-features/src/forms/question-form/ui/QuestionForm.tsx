'use client';

import { FormEventHandler, useState } from "react";
import { toast } from 'react-toastify';
import { usePathname } from "next/navigation";
import styled from "styled-components";

import {ReactComponent as MailIcon} from '@freelbee/assets/icons/mail/mail.svg';

import ApplicationFormValidator from "../util/ApplicationFormValidator";
import { SectionId, sectionSeoText } from "@landing/entities";
import { LeadMessageBuilder } from "@freelbee/features";
import { useSendRegisteredLeadMutation } from "@landing/features";
import { Button, Input, TextArea } from "@freelbee/shared/ui-kit";
import { Breakpoint, ButtonStyleEnum, Color } from "@freelbee/shared/ui-kit";
import { LanguageType } from "@freelbee/shared/language";
import { ValidatorResult } from "@freelbee/features";

interface FormData {
    email: string;
    message: string;
}

export function QuestionForm () {

    const [formData, setFormData] = useState<FormData>({email: '', message: ''});

    const validator = new ApplicationFormValidator();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [sendLeadToCRM] = useSendRegisteredLeadMutation();
    const pathName = usePathname();

    const sendTelegramNotification = async (formData: FormData) => {
        const tgMessage = new LeadMessageBuilder(`New message from landing!`)
            .email(formData.email)
            .message(formData.message)
            .source(sectionSeoText[SectionId.QUESTIONS_FORM])
            .build();

        return fetch("/api/tg_bot", {
            method: "POST",
            body: JSON.stringify(tgMessage)
        });
    };

    const sendLead = async (formData: FormData) => {
        if(process.env.NEXT_PUBLIC_MODE === 'prod') {
            sendLeadToCRM({
                Email: formData.email,
                Last_Name: '--',
                Lead_Source: "https://freelbee.com" + pathName,
                field: formData.message
            });                
        }
    };

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

            sendLead(formData);
            const res = await sendTelegramNotification(formData);
            
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
                icon={<MailIcon stroke={Color.GRAY_600} />}
                isError={validationResult.hasError('email')}
                errorMessage={validationResult.getMessageByLanguage('email', LanguageType.EN)}
                placeholder='mail@company.com' 
                label='E-mail to contact you'
                value={formData.email} 
                setValue={(val) => setFormData((prev) => ({...prev, email: val}))} 
                data-testid='question-form-email'/>
            <TextArea
                isError={validationResult.hasError('message')}
                errorMessage={validationResult.getMessageByLanguage('message', LanguageType.EN)}
                placeholder='Ask whatever you want' 
                label='Your question'
                data-testid='question-form-text'
                value={formData.email} 
                onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))} />
            <Button 
                wideOnBreakPoint={Breakpoint.xMobile}
                styleType={ButtonStyleEnum.GREEN}
                isLoading={isLoading}
                isSuccess={isSuccess}
                data-testid='question-form-submit'
                data-crmid='question-form-button'>
                Talk to us
            </Button>
        </Form>
    );
};

const Form = styled.form`
    display: grid;
    gap: 16px;
`;