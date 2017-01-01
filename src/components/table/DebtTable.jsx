import React from 'react';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';
import MorphingLineItemContainer from '../../containers/table/MorphingLineItemContainer';
import AdditionLineItemContainer from '../../containers/table/AdditionLineItemContainer';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.getLineItems.bind(this);
  }

  getLineItems() {
    const lineItems = this.props.debts.map(loan => (
      <DisplayLineItemContainer
        key={loan.id}
        id={loan.id}
        name={loan.name}
        amount={loan.amount}
        interestRate={loan.interestRate}
        minPayment={loan.minPayment}
      />
    ));
    this.props.pendingChanges.forEach((loan, index) => {
      if (loan.morphing) {
        lineItems[index] = (
          <MorphingLineItemContainer
            key={loan.id}
            id={loan.id}
            name={loan.name}
            amount={loan.amount}
            interestRate={loan.interestRate}
            minPayment={loan.minPayment}
          />
        );
      }
    });
    return lineItems;
  }

  // array rendered elements require keys, that's why a key property is defined
  render() {
    // note to self: I'll prob want to factor this out into a class method with binded this
    const lineItems = this.getLineItems();
    const additionBar = <AdditionLineItemContainer />;
    return (
      <div>
        {lineItems}
        {additionBar}
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
    })).isRequired,
  pendingChanges: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      morphing: React.PropTypes.bool.isRequired,
      name: React.PropTypes.string,
      amount: React.PropTypes.number,
      interestRate: React.PropTypes.number,
      minPayment: React.PropTypes.number,
    })).isRequired,
};

export default DebtTable;
