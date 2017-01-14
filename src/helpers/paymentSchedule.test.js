import chai, { expect } from 'chai';
import chaiSorted from 'chai-sorted';
import {
  prioritize,
  payMandatoryFees,
  getPaymentSchedule,
  payExtra,
} from './paymentSchedule.js';


chai.use(chaiSorted);

describe('prioritize', () => {
  let SNOWBALL;
  let AVALANCHE;
  let sampleDebts;

  beforeEach(() => {
    SNOWBALL = 'snowball';
    AVALANCHE = 'avalanche';

    sampleDebts = [
    { name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
    ];
  });

  it('can sort debts in ascending amount order', () => {
    const orderedDebts = prioritize(sampleDebts, SNOWBALL);
    expect(orderedDebts).to.be.ascendingBy('amount');
  });

  it('can sort debts in descending interestRate order', () => {
    const orderedDebts = prioritize(sampleDebts, AVALANCHE);
    expect(orderedDebts).to.be.descendingBy('interestRate');
  });
});

describe('getPaymentSchedule', () => {
  let sampleDebts;

  beforeEach(() => {
    sampleDebts = [
    { name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
    ];
  });

  it('should map its input to an output of equivalent length', () => {
    const inputLen = sampleDebts.length;
    expect(getPaymentSchedule(sampleDebts)).to.have.lengthOf(inputLen);
  });

  it('should return the right properties and types', () => {
    const debts = getPaymentSchedule(sampleDebts);
    const debt = debts[0];

    expect(debt.name).to.be.a('string');
    expect(debt.amount).to.be.a('number');
    expect(debt.interestRate).to.be.a('number');
    expect(debt.minPayment).to.be.a('number');
    expect(debt.schedule).to.be.instanceof(Array);
  });

  it('should reduce all debts to zero', () => {
    const debts = getPaymentSchedule(sampleDebts);
    debts.forEach((debt) => {
      expect(debt.schedule.pop().leftover).to.be.closeTo(0, 0.00001);
    });
  });

  it('should not stop even when lowest prioirity debt gets paid first', () => {
    sampleDebts = [
      { name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
      { name: 'Car Loan', amount: 17000, interestRate: 0.032, minPayment: 2200.00 },
      { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
      { name: 'Low-prioirty debt', amount: 0.01, interestRate: 0.01, minPayment: 0.01},
    ];
    const debts = getPaymentSchedule(sampleDebts);
    debts.forEach((debt) => {
      expect(debt.schedule.pop().leftover).to.be.closeTo(0, 0.00001);
    });
  });

  it('should reduce debts over time', () => {
    const debts = getPaymentSchedule(sampleDebts);
    const debt = debts[0];
    expect(debt.schedule).to.be.descendingBy('leftover');
  });

  /**
   * TODO: Write test to detect ascending then descending pattern
   * pass: [2, 4, 5, 10, 2, 0, 0, 0]
   * fail: [2, 4, 5, 10, 2, 0, 0, 8]
   */
  /**
  it('should pay a higher principal over time then flatten out', () => {
    const debts = getPaymentSchedule(sampleDebts);
    const debt = debts[0];

    // iterate over array until first decrease is spotted
    const dip = debt.forEach

    expect(debt.schedule).to.be.ascendingBy('principal');
  });
   */

  it('should pay lower interest over time', () => {
    const debts = getPaymentSchedule(sampleDebts);
    const debt = debts[0];
    expect(debt.schedule).to.be.descendingBy('interest'); 
  });
});

describe('payMandatoryFees', () => {
  let leftover;
  let currPayment;
  let interestRate;

  beforeEach(() => {
    currPayment = 1685.47;
    interestRate = 0.07; 
    leftover = 15148.05;
  });

  // smoke test
  it('returns the right properties and types', () => {
    const nextMonth = payMandatoryFees(leftover, currPayment, interestRate);

    expect(nextMonth.payment).to.be.a('number');
    expect(nextMonth.interest).to.be.a('number');
    expect(nextMonth.principal).to.be.a('number');
    expect(nextMonth.leftover).to.be.a('number');
  });
});