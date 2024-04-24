import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class OnlyLettersRule implements IRule
{
    public check (value : string) : boolean
    {
        return /^[а-яА-Яa-zA-Z ]+$/.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}
