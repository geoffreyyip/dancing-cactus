import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';

import DebtTableComponent from './DebtTable.jsx';
import AddDebtContainer from './AddDebtContainer';


describe('DebtTable', () => {

  // supplies necessary props
  const dummyProps = {
    debts: [],
    headerInfo: [],
    handleNewDebt: function () {},
    changeHandlers: function () {},
    deleteHandler: function () {},
  };

  let debtTable;

  // render a fresh wrapper for each case
  beforeEach(() => {
    debtTable = shallow(
      <DebtTableComponent
        {...dummyProps}
      />
    );
  }); 
  
  it('should render an AddDebtContainer', () => {
    expect(debtTable.find(AddDebtContainer)).to.have.lengthOf(1);
  });

  it('should pass handleNewDebt to AddDebtContainer', () => {
    const addDebtContainer = debtTable.find(AddDebtContainer);
    expect(addDebtContainer.prop('onNewDebt')).to.exist;
  });
});