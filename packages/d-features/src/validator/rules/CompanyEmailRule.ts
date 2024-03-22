import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class CompanyEmailRule implements IRule
{
    private emailDomainRegexp = /@?(yahoo.com|gmail.com|outlook.com|mail.com|@mailinator.com)$/;

    public check (value : string) : boolean
    {
        return !this.emailDomainRegexp.test(value.trim());
    }

    public message () : RuleMessage
    {
        return {
            en: `Please provide your corporate email, this email is not suitable`,
        };
    }
}

