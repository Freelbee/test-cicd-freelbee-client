import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class MaxLengthRule implements IRule
{
    private readonly maxValue : number;

    constructor (maxValue: number) {
        this.maxValue = maxValue;
    }
    public check (value : string) : boolean
    {
        return value.length <= this.maxValue;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field cannot contain more than ${this.maxValue} characters`,
        };
    }
}

