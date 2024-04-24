import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

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
