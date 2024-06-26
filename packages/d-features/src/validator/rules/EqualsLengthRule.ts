import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

export class EqualsLengthRule implements IRule
{
    private readonly equalsValue : number;

    constructor (equalsValue: number) {
        this.equalsValue = equalsValue;
    }
    public check (value : string) : boolean
    {
        return value.length === this.equalsValue;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field must contains ${this.equalsValue} characters`,
        };
    }
}

