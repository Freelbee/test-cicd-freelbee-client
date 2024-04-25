import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import{ IRule} from "../interface/IRule";

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
