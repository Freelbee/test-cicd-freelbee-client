import { CheckedRule } from "../CheckedRule";

describe('Checked rule tests', () => {
  const rule = new CheckedRule();
  const validationMsg = {"en": "The field cannot be empty"};

  it('Should pass with valid value', () => {
    // given
    const valid = true;

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = false;

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});