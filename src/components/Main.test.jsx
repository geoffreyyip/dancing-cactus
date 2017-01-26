import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Main from './Main';

describe('handleNewDebt', () => {
  jest.enableAutomock();
  const main = shallow(<Main />);
  const sampleDebts = [
    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ];

  it('should add a new debt object', () => {
    const startLength = main.state('debts').length;
    const handleNewDebt = main.instance().handleNewDebt;
    handleNewDebt(sampleDebts[0]);
    expect(main.state().debts).toHaveLength(startLength + 1);
    expect(main.state().debts).toContainEqual(sampleDebts[0]);
  });

  it('should add a new debt to an empty state', () => {

  });
});

describe('smoke test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Main />);
  });
});
