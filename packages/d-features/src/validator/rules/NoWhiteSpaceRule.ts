import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class NoWhiteSpaceRule implements IRule
{

    public check (value : string) : boolean
    {
        return value.match(/\s+/) === null;
    }

    public message () : RuleMessage
    {
        return {
            en: `There should be no spaces in the field`,
        };
    }
}