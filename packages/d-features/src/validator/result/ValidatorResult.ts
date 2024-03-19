import { LanguageType } from "@freelbee/entities";
import { RuleMessage } from "../interface/RuleMessage";

export class ValidatorResult<T>
{
    private errors : {
        [key in keyof T]?: RuleMessage
    } = {};

    public setError (name: keyof T, message : RuleMessage) : void
    {
        this.errors[name] = message;
    }

    public hasError (name: keyof T) : boolean
    {
        return name in this.errors;
    }

    public getMessage (name: keyof T) : RuleMessage | undefined
    {
        return this.errors[name];
    }

    public getMessageByLanguage (name: keyof T, language: LanguageType) : string
    {
        const message = this.errors[name];
        return message ? message[language] : '';
    }

    public removeError (name: keyof T)
    {
        delete this.errors[name];
        return this;
    }

    public isSuccess () : boolean
    {
        return Object.keys(this.errors).length === 0;
    }
}