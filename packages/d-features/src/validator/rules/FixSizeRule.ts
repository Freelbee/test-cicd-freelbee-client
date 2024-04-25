import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

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
            en: `The field is filled in incorrectly`,
        };
    }
}
