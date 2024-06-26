import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

export class EmailRule implements IRule
{

    public check (value : string) : boolean
    {
        // eslint-disable-next-line no-useless-escape
        const emailRegexp = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-])+\.([A-Za-z]{2,15})$/;
        return emailRegexp.test(value);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}

