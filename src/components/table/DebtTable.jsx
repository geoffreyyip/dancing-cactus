import React from 'react';
import ModificationBar from './ModificationBar';
import AdditionBar from './AdditionBar';
import SaveChangesBar from './SaveChangesBar';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';

const DebtTable = () => (
  <div className="debt-table">
    <DisplayLineItemContainer />
    <ModificationBar />
    <AdditionBar />
    <SaveChangesBar />
  </div>
);

export default DebtTable;
