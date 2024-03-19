import {IRule} from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class CirilycRule implements IRule
{
    public check (value : string) : boolean
    {
        if(!value || value === ``) return true;
        return /^[А-я]+?$/.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field must contain only Cyrillic letters`,
        };
    }
}