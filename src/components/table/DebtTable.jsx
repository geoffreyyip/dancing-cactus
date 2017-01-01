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
        { id: 22, name: 'Success if second in list!', amount: 17000, interestRate: 0.032, minPayment: 2200.00 },
      ],
    };
  }

  // array rendered elements require keys, that's why a key property is defined
  render() {
    const displayLineItems = this.state.mockRegular.map(loan => (
      <DisplayLineItemContainer
        key={loan.id}
        name={loan.name}
        amount={loan.amount}
        interestRate={loan.interestRate}
        minPayment={loan.minPayment}
      />
    ));
    const morphingLineItems = this.state.mockEdit.map(loan => (
      <MorphingLineItemContainer
        key={loan.id}
        name={loan.name}
        amount={loan.amount}
        interestRate={loan.interestRate}
        minPayment={loan.minPayment}
      />
    ));
    const additionBar = <AdditionLineItemContainer />;
    return (
      <div>
        {displayLineItems}
        {morphingLineItems}
        {additionBar}
      </div>
    );
  }
}

export default DebtTable;
