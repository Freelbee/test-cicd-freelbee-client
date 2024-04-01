import { OGRNRule } from "../OGRNRule";

describe('OGRN rule tests', () => {
  const rule = new OGRNRule();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = '1098768506572';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = '1234567893214';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});