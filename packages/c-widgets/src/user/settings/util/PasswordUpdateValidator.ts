import { PasswordUpdateDto } from "@freelbee/entities";
import { AbstractValidator, IRule, PasswordRule, RequiredRule } from "@freelbee/features";

export class PasswordUpdateValidator extends AbstractValidator<PasswordUpdateDto>
{
    protected rules () : {[key in keyof PasswordUpdateDto]?: IRule[]}
    {
        return {
            newPassword: [new RequiredRule(), new PasswordRule()],
            oldPassword: [new RequiredRule()]
        };
    }
}