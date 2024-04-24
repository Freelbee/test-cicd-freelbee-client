import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class RequiredRule implements IRule
{
    public check (value : string) : boolean
    {
        if(typeof value === 'string') {
          return !!(value.trim());
        }
        return !!value;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field cannot be empty`,
        };
    }
}
