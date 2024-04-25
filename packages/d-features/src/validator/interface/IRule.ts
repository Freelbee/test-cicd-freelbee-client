import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";

export interface IRule {
    check (value : unknown) : boolean;
    message () : RuleMessage;
}


