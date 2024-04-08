import { AbstractValidator, IRule, OnlyLettersRule, PhoneRuleLazy, RequiredRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";

export class PersonalFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            phone: [new RequiredRule(), new PhoneRuleLazy()],
            name: [ new RequiredRule(), new OnlyLettersRule()],
            surname: [new RequiredRule(), new OnlyLettersRule()],
            dateOfBirth: [new RequiredRule()],
        };
    }
}