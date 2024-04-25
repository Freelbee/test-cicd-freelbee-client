import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

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
