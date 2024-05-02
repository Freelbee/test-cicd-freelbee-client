import { MaximumNumberRule } from "../MaximumNumberRule";

describe('Maximum Number rule tests', () => {
  const maximum = 1000;
  const rule = new MaximumNumberRule(maximum);
  const validationMsg = {"en": `the number cannot be more than ${maximum}`};

  it('Should pass with valid value', () => {
    // given
    const valid = '1000';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = '1001';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});