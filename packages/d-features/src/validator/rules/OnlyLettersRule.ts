import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

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