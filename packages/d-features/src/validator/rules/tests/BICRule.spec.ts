import { BICRule } from "../BICRule";

describe('BIC rule tests', () => {
  const rule = new BICRule();
  const validationMsg = {"en": "The field is filled in incorrectly"};
  it('Should pass with valid BIC', () => {
    // given
    const validBIC = '155678437';

    // then
    expect(rule.check(validBIC)).toBeTruthy();
  });

  it('Should not pass with invalid BIC', () => {
    // given
    const invalidBIC = '';

    // then
    expect(rule.check(invalidBIC)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});