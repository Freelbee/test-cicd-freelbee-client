import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

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