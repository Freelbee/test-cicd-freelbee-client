'use client';

import { FormEventHandler, useState } from "react";
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";

import 'react-toastify/dist/ReactToastify.css';
import { SectionId, sectionSeoText } from "@landing/entities";
import { LeadMessageBuilder } from "@freelbee/features";
import { ValidatorResult } from "@freelbee/features";
import { Input, PhoneNumberInput, TextArea, Button } from "@freelbee/shared/ui-kit";
import { Breakpoint, ButtonStyleEnum, Color, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { LanguageType } from "@freelbee/shared/language";

import { ReactComponent as CompanyIcon } from '@freelbee/assets/icons/location/building.svg';
import{ ReactComponent as MailIcon } from '@freelbee/assets/icons/mail/mail.svg';
import { ReactComponent as UserIcon }  from '@freelbee/assets/icons/user/person.svg';

import ApplicationFormValidator from "./util/ApplicationFormValidator";

import {FormData} from './interface/FormData';
import { useSendRegisteredLeadMutation } from "../../zoho-crm/query/zohoAPI";

const DEFAULT = {
    email: '',
    phone: '',
    message: '',
    name: '',
    company: ''
};

export const ApplicationModalForm = () => {

    const [formData, setFormData] = useState<FormData>(DEFAULT);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const validator = new ApplicationFormValidator();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [sendLeadToCRM] = useSendRegisteredLeadMutation();

    const sendTelegramNotification = async (formData: FormData) => {
        const tgMessage = new LeadMessageBuilder(`New message from landing!`)
            .name(formData.name)
            .phone(formData.phone)
            .email(formData.email)
            .message(formData.message)
            .company(formData.company)
            .source(getTargetText())
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
                Last_Name: formData.name,
                Company: formData.company,
                Phone: formData.phone,
                Lead_Source: "https://freelbee.com" + pathName,
                field: formData.message
            });
        }
    };

    const getTargetText = (): string => {
        const modalParam = searchParams.get('modal'); // Expected value = ModalQueryValue.APPLICATION + SectionId (modal=application_devices)
        if(!modalParam) return '';
        const sectionIdIdx = modalParam.indexOf('_');
        if(sectionIdIdx === -1) return '';

        const sectionId = modalParam.slice(sectionIdIdx);
        return sectionSeoText[sectionId as SectionId] ?? '';
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

                router.push('/thanks-for-booking');
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
        <Form onSubmit={sendApplication} data-crmid='application-form-email'>
            <Input
                data-testid='landing-form-name'
                icon={<UserIcon stroke={Color.GRAY_600} />}
                isError={validationResult.hasError('name')}
                errorMessage={validationResult.getMessageByLanguage('name', LanguageType.EN)}
                placeholder='John Silver'
                label='Full Name'
                value={formData.name}
                setValue={(val) => setFormData((prev) => ({...prev, name: val}))} />
            <Input
                icon={<CompanyIcon stroke={Color.GRAY_600} />}
                isError={validationResult.hasError('company')}
                errorMessage={validationResult.getMessageByLanguage('company', LanguageType.EN)}
                placeholder='FREELBEE'
                label='Company name'
                data-testid='landing-form-company'
                value={formData.company}
                setValue={(val) => setFormData((prev) => ({...prev, company: val}))} />
            <Input
                isError={validationResult.hasError('email')}
                errorMessage={validationResult.getMessageByLanguage('email', LanguageType.EN)}
                placeholder='mail@company.com'
                label='Company E-mail'
                data-testid='landing-form-email'
                icon={<MailIcon stroke={Color.GRAY_600} />}
                value={formData.email}
                setValue={(val) => setFormData((prev) => ({...prev, email: val}))} />
            <PhoneNumberInput
                label="Phone"
                data-testid='landing-form-phone'
                value={formData.phone}
                setValue={(val) => setFormData((prev) => ({...prev, phone: val}))}
            />
            <TextArea
                data-testid='landing-form-message'
                isError={validationResult.hasError('message')}
                errorMessage={validationResult.getMessageByLanguage('message', LanguageType.EN)}
                placeholder='Ask whatever you want!'
                label='Any question?'
                value={formData.message}
                setValue={(val) => setFormData((prev) => ({...prev, message: val}))}
            />
            <Button
                styleType={ButtonStyleEnum.BLACK}
                styles={buttonStyle}
                isWide
                isLoading={isLoading}
                isSuccess={isSuccess}
                data-crmid='application-form-button'
                data-testid='landing-form-submit'>
                Sent
            </Button>
        </Form>
    );
};

const Form = styled.form`
    display: grid;
    gap: 16px;
    margin-bottom: 16px;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        gap:8px;
        margin-bottom: 8px;
    }
`;

const buttonStyle = css`
    margin-top: 16px;
`;
