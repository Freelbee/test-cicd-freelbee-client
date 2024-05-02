import { AbstractValidator, IRule, OnlyLettersRule, RequiredRule } from "@freelbee/features";
import { CompanyFormData } from "../interface/CompanyFormData";
import { CounterpartyDetailsPropsType } from "@freelbee/entities";

export class CompanyDataValidator extends AbstractValidator<CompanyFormData>
{
    protected rules () : {[key in keyof CompanyFormData]?: IRule[]}
    {
        return {
            [CounterpartyDetailsPropsType.ADDRESS]: [new RequiredRule()],
            [CounterpartyDetailsPropsType.NAME]: [ new RequiredRule()],
            [CounterpartyDetailsPropsType.DIRECTOR_NAME]: [ new RequiredRule(), new OnlyLettersRule()],
            [CounterpartyDetailsPropsType.TAX_NUMBER]: [new RequiredRule()],
            [CounterpartyDetailsPropsType.TIN]: [new RequiredRule()],
            [CounterpartyDetailsPropsType.OGRN]: [new RequiredRule()],
            [CounterpartyDetailsPropsType.ZIP_CODE]: [new RequiredRule()]
        };
    }
}