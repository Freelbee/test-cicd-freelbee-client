import { RuleMessage } from "./RuleMessage";

export interface IRule {
    check (value : unknown) : boolean;
    message () : RuleMessage;
}


