import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export default class OnlyNumbersRule implements IRule
{
    public check (value : string) : boolean
    {
        return /^[0-9]+$/.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}
