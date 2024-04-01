import { MinLengthRule } from "../MinLengthRule";

describe('Min Length rule tests', () => {
  const min = 3;
  const rule = new MinLengthRule(min);
  const validationMsg = {"en": `The field cannot contain less than ${min} characters`};

  it('Should pass with valid value', () => {
    // given
    const valid = 'Text';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = 'Te';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});