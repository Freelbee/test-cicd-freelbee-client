import { IRule } from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class MaximumNumberRule implements IRule
{

    private max: number;
    constructor (max: number) {
        this.max = max;
    }
    public check (value?: unknown) : boolean
    {
        if (value === null || value === undefined) {
            return false;
        }
        if(typeof value === 'number' && isNaN(value)) {
            return false;
        }
        return parseInt(value as string) <= this.max;
    }

    public message () : RuleMessage
    {
        return {
            en: `the number cannot be more than ${this.max}`,
        };
    }
}