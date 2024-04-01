import { EqualsLengthRule } from "../EqualsLengthRule";

describe('EqualsLength rule tests', () => {
  const requiredLength = 10;
  const rule = new EqualsLengthRule(requiredLength);
  const validationMsg = {"en": `The field must contains ${requiredLength} characters`};

  it('Should pass with valid value', () => {
    // given
    const valid = '1234567890';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with empty string value', () => {
    // given
    const invalid = '123';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});