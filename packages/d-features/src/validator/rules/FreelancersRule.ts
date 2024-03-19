import{ IRule} from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class FreelancersRule implements IRule
{
    public check (value : string) : boolean
    {
        return value.length > 0;
    }

    public message () : RuleMessage
    {
        //TODO message
        return {
            en: `The field cannot be empty`,
        };
    }
}