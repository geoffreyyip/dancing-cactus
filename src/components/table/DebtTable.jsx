import React from 'react';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';
import MorphingLineItemContainer from '../../containers/table/MorphingLineItemContainer';
import AdditionLineItemContainer from '../../containers/table/AdditionLineItemContainer';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.getLineItems.bind(this);
  }

  // Debts array is passed down from the Main component's state

  // getLineItems() renders two different components, one for
  // elements with a defined pendingChanges property and another
  // for those without it.
  getLineItems() {
    const lineItems = this.props.debts.map((loan, index) => {
      // TODO: replace with tertiary operator
      if (loan.pendingChanges) {
        return (
          <MorphingLineItemContainer
            key={loan.id}
            id={loan.id}
            name={loan.pendingChanges.name}
            amount={loan.pendingChanges.amount}
            interestRate={loan.pendingChanges.interestRate}
            minPayment={loan.pendingChanges.minPayment}
            handleDeleteChanges={this.props.morphingHandler(index).handleDeleteChanges}
          />
        );
      }
      return (
        <DisplayLineItemContainer
          key={loan.id}
          id={loan.id}
          name={loan.name}
          amount={loan.amount}
          interestRate={loan.interestRate}
          minPayment={loan.minPayment}
          handleDeleteItem={this.props.deleteHandler(index).handleDeleteItem}
        />
      );
    });
    return lineItems;
  }

  // handleNewDebt method will get passed down multiple hierarchies
  // Main > DebtTable (you are here) > AdditionLineItemContainer > AdditionLineItem
  render() {
    const lineItems = this.getLineItems();
    const additionBar = <AdditionLineItemContainer handleNewDebt={this.props.handleNewDebt} />;
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
