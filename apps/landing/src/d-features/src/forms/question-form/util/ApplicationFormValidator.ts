
import { AbstractValidator, CompanyEmailRule, EmailRule, IRule, RequiredRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";

export default class ApplicationFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            email: [new RequiredRule(), new EmailRule(), new CompanyEmailRule()],
            message: [new RequiredRule()],
        };
    }
}