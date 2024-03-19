import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export default class OnlyNumbersRule implements IRule
{
    public check (value : string) : boolean
    {
        return /^[0-9]+$/.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly!`,
        };
    }
}