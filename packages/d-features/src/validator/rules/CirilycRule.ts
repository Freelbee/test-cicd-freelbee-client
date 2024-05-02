import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

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
