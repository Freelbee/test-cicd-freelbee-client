import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class OGRNRule implements IRule
{

    public check (value : string) : boolean
    {
        if (/[^0-9]/.test(value) || value.length !== 13) {
            return false;
        }
        const n13 = parseInt((parseInt(value.slice(0, -1)) % 11).toString().slice(-1));
        return n13 === parseInt(value[12]);
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}
