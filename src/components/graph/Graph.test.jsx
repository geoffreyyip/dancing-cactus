import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Graph from './Graph';
import AcceleratorBar from './AcceleratorBar';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

describe('<Graph /> smoke tests', () => {

  const sampleDebts = [
    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ];

  const dummyProps = {
    debts: sampleDebts,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Graph
        {...dummyProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(
      <Graph
        {...dummyProps}
      />
    );
  });

});