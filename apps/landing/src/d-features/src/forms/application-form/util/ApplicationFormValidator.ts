import { AbstractValidator, EmailRule, IRule, OnlyLettersRule, RequiredRule, CompanyEmailRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";

export default class ApplicationFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            email: [new RequiredRule(), new EmailRule(), new CompanyEmailRule()],
            // message: [new RequiredRule()],
            phone: [new RequiredRule()],
            name: [ new RequiredRule(), new OnlyLettersRule()],
            company: [new RequiredRule()]
        };
    }
}