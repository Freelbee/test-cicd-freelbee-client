import {AbstractValidator, EmailRule, IRule, RequiredRule} from "@freelbee/features";
import {AuthDto} from "@freelbee/entities";


export class LoginDataValidator extends AbstractValidator<AuthDto>
{
    protected rules () : {[key in keyof AuthDto]?: IRule[]}
    {
        return {
            email: [new RequiredRule(), new EmailRule()],
        };
    }
}

