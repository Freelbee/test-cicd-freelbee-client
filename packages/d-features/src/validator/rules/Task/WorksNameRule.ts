import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../../interface/IRule";

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
