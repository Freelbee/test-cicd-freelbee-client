import {IRule} from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class CheckedRule implements IRule
{
    public check (value : boolean) : boolean
    {
        return !!value;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field cannot be empty`,
        };
    }
}