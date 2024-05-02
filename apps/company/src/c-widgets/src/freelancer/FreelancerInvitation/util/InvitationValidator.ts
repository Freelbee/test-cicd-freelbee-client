import {AbstractValidator, EmailRule, IRule, RequiredRule} from "@freelbee/features";
import {FreelancerInvitationDto} from "@company/entities";

export class InvitationValidator extends AbstractValidator<FreelancerInvitationDto> {
  protected rules () : {[key in keyof FreelancerInvitationDto]?: IRule[]}
  {
    return {
      freelancerEmail: [new RequiredRule(), new EmailRule()],
    };
  }
}
