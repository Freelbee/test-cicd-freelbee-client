import { PaymentAccountRule } from "../PaymentAccountRule";

describe('Payment Account rule tests', () => {
  const rule = new PaymentAccountRule();
  const validationMsg = {"en": "Incorrect format of the current account or BIC"};

  it('Should pass with valid value', () => {
    // given
    const valid = { accountNumber: '40702810400260004426', bik: '044525600'};

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid bik value', () => {
    // given
    const invalid = { accountNumber: '30101810200000000593', bik: '1231'};

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });

  it('Should not pass with invalid account value', () => {
    // given
    const invalid = { accountNumber: '23213123123', bik: '044525593'};

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});