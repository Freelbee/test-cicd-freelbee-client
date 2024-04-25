import { AbstractValidator, IRule, OnlyLettersRule, RequiredRule } from "@freelbee/features";
import { PersonalFormData } from "../interface/PersonalFormData";
import { UserDataPropsType } from "@freelbee/entities";

export class PersonalFormValidator extends AbstractValidator<PersonalFormData>
{
    protected rules () : {[key in keyof PersonalFormData]?: IRule[]}
    {
        return {
            [UserDataPropsType.FIRST_NAME]: [ new RequiredRule(), new OnlyLettersRule()],
            [UserDataPropsType.LAST_NAME]: [new RequiredRule(), new OnlyLettersRule()],
            [UserDataPropsType.BIRTH_DATE]: [new RequiredRule()],
            [UserDataPropsType.DOCUMENT_NUMBER]: [new RequiredRule()],
        };
    }
}
