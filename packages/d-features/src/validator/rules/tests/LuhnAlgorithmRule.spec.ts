import { LuhnAlgorithmRule } from "../LuhnAlgorithmRule";


describe('Luhn Algorithm rule tests', () => {
  const rule = new LuhnAlgorithmRule();
  const validationMsg = {"en": "Card is not valid"};

  it('Should pass with valid value', () => {
    // given
    const valid = '5467929858074128';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = '1234565633322231';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});