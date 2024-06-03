import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class MinAgeRule implements IRule
{
    private readonly minAge : number;

    constructor (minAge: number) {
        this.minAge = minAge;
    }

    private getAge(dateOfBirth: string) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const month = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    public check (dateOfBirth: string) : boolean
    {
        return this.getAge(dateOfBirth) >= this.minAge;
    }

    public message () : RuleMessage
    {
        return {
            en: `You must be ${this.minAge} years or older.`,
        };
    }
}
