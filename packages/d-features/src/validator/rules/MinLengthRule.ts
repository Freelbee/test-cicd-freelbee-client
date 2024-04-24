import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

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

