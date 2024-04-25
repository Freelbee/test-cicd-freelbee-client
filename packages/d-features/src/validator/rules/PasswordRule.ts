import {IRule} from "@freelbee/features";
import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";

export class PasswordRule implements IRule {
  public check(value: string): boolean {
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    return hasLowerCase && hasUpperCase;
  }

  public message(): RuleMessage {
    return {
      en: `Password should contain at less one lowercase symbol and one uppercase`
    };
  }
}
