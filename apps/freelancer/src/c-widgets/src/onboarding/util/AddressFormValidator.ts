import { AbstractValidator, IRule, OnlyLettersRule, RequiredRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";
import OnlyNumbersRule from "packages/d-features/src/validator/rules/OnlyNumbersRule";
import { UserDataPropsType } from "@freelbee/entities";

export class AddressFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            [UserDataPropsType.POSTAL_CODE]: [new RequiredRule(), new OnlyNumbersRule()],
            [UserDataPropsType.CITY]: [ new RequiredRule(), new OnlyLettersRule()],
            [UserDataPropsType.COUNTRY]: [new RequiredRule()],
            [UserDataPropsType.STREET]: [new RequiredRule()],
            [UserDataPropsType.HOUSE_NUMBER]: [new RequiredRule(), new OnlyNumbersRule()]
        };
    }
}