import React from 'react';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';
import MorphingLineItemContainer from '../../containers/table/MorphingLineItemContainer';
import AdditionLineItemContainer from '../../containers/table/AdditionLineItemContainer';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mockRegular: [
        { id: 21, name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
        { id: 22, name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
        { id: 23, name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
      ],
      mockEdit: [
        { id: 21, morphing: false },
        { id: 22, morphing: true, name: 'Success if second in list!', amount: 17000, interestRate: 0.032, minPayment: 2200.00 },
        { id: 23, morphing: false },
      ],
    };
  }

  // array rendered elements require keys, that's why a key property is defined
  render() {
    // note to self: I'll prob want to factor this out into a class method with binded this
    const lineItems = this.state.mockRegular.map(loan => (
      <DisplayLineItemContainer
        key={loan.id}
        id={loan.id}
        name={loan.name}
        amount={loan.amount}
        interestRate={loan.interestRate}
        minPayment={loan.minPayment}
      />
    ));
    this.state.mockEdit.forEach((loan, index) => {
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
    const additionBar = <AdditionLineItemContainer />;
    return (
      <div>
        {lineItems}
        {additionBar}
      </div>
    );
  }
}

export default DebtTable;
