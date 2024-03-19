import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class RequiredRuleWidthSpecialChars implements IRule
{
    public check (value : string) : boolean
    {
        return value !== '' && value.replace(/[^\u0041-\u005A\u0061-\u007A\u0410-\u044F\u0401\u0451]/g, '') !== ``;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}