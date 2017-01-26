import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AddDebtContainer from './AddDebtContainer';
import AdditionBar from './AdditionBar';
import LineWrapper from './LineWrapper';

describe('<AddDebtContainer /> smoke tests', () => {

  // headerInfo mimics the metadata passed down from Main component
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

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AddDebtContainer
        {...dummyProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(<AddDebtContainer {...dummyProps} />);
  });

  it('should render a single AdditionBar', () => {
    expect(wrapper.find(AdditionBar)).to.have.lengthOf(1);
  });

  it('should render an input for each item in the fields prop', () => {
    const fieldsNo = headerInfo.length;
    expect(wrapper.find('input')).to.have.lengthOf(fieldsNo);
  });

  it('should render a state prop for each field', () => {
    headerInfo.forEach((header) => {
      expect(wrapper.state(header.name)).to.exist;
    });
  });

  it('should render a single LineWrapper', () => {
    expect(wrapper.find(LineWrapper)).to.have.lengthOf(1);
  });

  // functional test; simulates user input
  it('should update state on input change', () => {
    const firstField = headerInfo[0].name;
    const input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'yogurt' } });
    expect(wrapper.state(firstField)).to.equal('yogurt');
  });

});
