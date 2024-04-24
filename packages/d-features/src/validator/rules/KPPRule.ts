import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

export class KPPRule implements IRule
{

    public check (value : string) : boolean
    {

        if (value.length !== 9 || !/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(value)) {
            return false;
        }

        return true;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}
