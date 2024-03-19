
import { AbstractValidator, EmailRule, IRule, RequiredRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";

export default class ApplicationFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            email: [new RequiredRule(), new EmailRule()],
            message: [new RequiredRule()],
            phone: [new RequiredRule()],
        };
    }
}