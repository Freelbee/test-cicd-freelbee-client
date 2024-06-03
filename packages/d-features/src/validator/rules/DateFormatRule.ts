import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class DateFormatRule implements IRule
{
    public check (value : string) : boolean
    {
        return /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})/.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `Invalid date format. Enter the date like mm.dd.yyyy`,
        };
    }
}
