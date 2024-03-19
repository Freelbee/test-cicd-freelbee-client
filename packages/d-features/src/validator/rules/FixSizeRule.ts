import {IRule} from "../interface/IRule";
import { RuleMessage } from "../interface/RuleMessage";

export class FixSizeRule implements IRule
{

    private readonly fixSize : number;

    constructor (fixSize: number) {
        this.fixSize = fixSize;
    }

    public check (value : string) : boolean
    {
        return value?.length === this.fixSize;
    }


    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly!`,
        };
    }
}