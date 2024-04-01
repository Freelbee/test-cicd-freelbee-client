import {IRule} from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class BICRule implements IRule
{
    public check (value : string) : boolean
    {
        return !(/[^0-9]/.test(value) || value.length !== 9);

    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}