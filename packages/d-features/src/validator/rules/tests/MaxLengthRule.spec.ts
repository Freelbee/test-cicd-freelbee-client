import { MaxLengthRule } from "../MaxLengthRule";

describe('Max Length rule tests', () => {
  const max = 15;
  const rule = new MaxLengthRule(max);
  const validationMsg = {"en": `The field cannot contain more than ${max} characters`};
  it('Should pass with valid value', () => {
    // given
    const valid = 'some text';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = 'Very very long text';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});