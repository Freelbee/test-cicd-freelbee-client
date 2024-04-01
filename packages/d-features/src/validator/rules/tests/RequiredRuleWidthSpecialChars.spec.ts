import { RequiredRuleWidthSpecialChars } from "../RequiredRuleWidthSpecialChars";

describe('RequiredRule WidthSpecialChars tests', () => {
  const rule = new RequiredRuleWidthSpecialChars();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = 'UAB Pay Assistant';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid string value', () => {
    // given
    const invalid = '   ';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});