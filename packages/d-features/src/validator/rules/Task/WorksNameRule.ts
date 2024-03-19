import {IRule} from "../../interface/IRule";
import { RuleMessage } from "../../interface/RuleMessage";

export class WorksNameRule implements IRule
{
    public check (value : unknown) : boolean
    {
        return !!value;
    }

    public message () : RuleMessage
    {
        //TODO ошибки
        return {
            en: `The field cannot be empty`,
        };
    }
}