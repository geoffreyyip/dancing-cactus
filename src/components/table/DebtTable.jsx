import React from 'react';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';
import MorphingLineItemContainer from '../../containers/table/MorphingLineItemContainer';
import AdditionLineItemContainer from '../../containers/table/AdditionLineItemContainer';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);
  }

  // checks whether each Debt object has any pending changes on it
  // renders a MorphingLineItem for those with pending changes and a
  // DisplayLineItem for those without
  // render a AdditionLineItem at the end for users to add new debts with
  render() {
    return (
      <div>
        {this.props.debts.map((loan, index) => {
          const has = Object.prototype.hasOwnProperty;
          const hasPendingChanges = has.call(loan, 'pendingChanges');
          return (
            hasPendingChanges
            ? <MorphingLineItemContainer
              key={loan.id}
              name={loan.pendingChanges.name}
              amount={loan.pendingChanges.amount}
              interestRate={loan.pendingChanges.interestRate}
              minPayment={loan.pendingChanges.minPayment}
              handleDeleteChanges={this.props.morphingHandler(index).handleDeleteChanges}
            />
            : <DisplayLineItemContainer
              key={loan.id}
              name={loan.name}
              amount={loan.amount}
              interestRate={loan.interestRate}
              minPayment={loan.minPayment}
              handleDeleteItem={this.props.deleteHandler(index).handleDeleteItem}
            />
          );
        })}
        <AdditionLineItemContainer handleNewDebt={this.props.handleNewDebt} />;
      </div>
    );
  }
}

DebtTable.propTypes = {
  debts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number.isRequired,
      interestRate: React.PropTypes.number.isRequired,
      minPayment: React.PropTypes.number.isRequired,
      pendingChanges: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
        interestRate: React.PropTypes.number.isRequired,
        minPayment: React.PropTypes.number.isRequired,
      }),
    })).isRequired,
  handleNewDebt: React.PropTypes.func.isRequired,
  morphingHandler: React.PropTypes.func.isRequired,
  deleteHandler: React.PropTypes.func.isRequired,
};

export default DebtTable;
