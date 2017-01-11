import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AddDebtContainerComponent from './AddDebtContainer.jsx';

const headerInfo = [
  { name: 'name', type: String, displayString: 'Name' },
  { name: 'amount', type: Number, displayString: 'Amount' },
  { name: 'interestRate', type: Number, displayString: 'Interest Rate' },
  { name: 'minPayment', type: Number, displayString: 'Minimum Payment' },
];

const dummyProps = {
  onNewDebt: () => {},
  fields: headerInfo,
};

describe('AddDebtContainer', () => {
  let addDebtContainer;

  // render new component per test
  beforeEach(() => {
    addDebtContainer = shallow(
      <AddDebtContainerComponent
        {...dummyProps}
      />
    );
  });

  it('should render a state prop for each field', () => {
    headerInfo.forEach((header) => {
      expect(addDebtContainer.state(header.name)).to.exist;
    });
  });

  // functional test; simulates user input
  it('should update state on input change', () => {
    const firstField = headerInfo[0].name;
    const input = addDebtContainer.find('input').first();
    input.simulate('change', { target: { value: 'yogurt' } });
    expect(addDebtContainer.state(firstField)).to.equal('yogurt');
  });
});
