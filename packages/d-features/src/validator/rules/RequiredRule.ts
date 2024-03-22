import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class RequiredRule implements IRule
{
    public check (value : string) : boolean
    {
        return !!(value.trim());
    }

    public message () : RuleMessage
    {
        return {
            en: `The field cannot be empty`,
        };
    }
}