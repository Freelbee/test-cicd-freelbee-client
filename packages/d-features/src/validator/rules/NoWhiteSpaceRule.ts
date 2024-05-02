import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

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
