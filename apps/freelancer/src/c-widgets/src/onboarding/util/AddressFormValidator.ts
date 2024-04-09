import { AbstractValidator, IRule, OnlyLettersRule, RequiredRule } from "@freelbee/features";
import { FormData } from "../interface/FormData";
import OnlyNumbersRule from "packages/d-features/src/validator/rules/OnlyNumbersRule";

export class AddressFormValidator extends AbstractValidator<FormData>
{
    protected rules () : {[key in keyof FormData]?: IRule[]}
    {
        return {
            postalCode: [new RequiredRule(), new OnlyNumbersRule()],
            city: [ new RequiredRule(), new OnlyLettersRule()],
            country: [new RequiredRule()],
            street: [new RequiredRule()],
            houseNumber: [new RequiredRule(), new OnlyNumbersRule()]
        };
    }
}