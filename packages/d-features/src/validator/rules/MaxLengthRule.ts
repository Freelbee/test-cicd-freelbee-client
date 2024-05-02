import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

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

