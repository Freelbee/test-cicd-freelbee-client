import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class MinLengthRule implements IRule
{
    private readonly minValue : number;

    constructor (minValue: number) {
        this.minValue = minValue;
    }
    public check (value : string) : boolean
    {
        return value.length >= this.minValue;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field cannot contain less than ${this.minValue} characters`,
        };
    }
}

