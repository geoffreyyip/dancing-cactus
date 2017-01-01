import React from 'react';
import DisplayLineItem from '../../components/table/DisplayLineItem';

const mockRegular = [
  { id: 21, name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
  { id: 22, name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
  { id: 23, name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
];

const mockItem = mockRegular[0];

const DisplayLineItemContainer = () => (
  <DisplayLineItem
    name={mockItem.name}
    amount={mockItem.amount}
    interestRate={mockItem.interestRate}
    minPayment={mockItem.minPayment}
  />
);

/*

const mockEdit = [
  { id: 22, name: 'College', amount: 17000, interestRate: 0.032, minPayment: 2200.00 },
];

*/

/*
class DisplayLineItemContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <DisplayLineItem
        name={mockItem.name}
        amount={mockItem.amount}
        interestRate={mockItem.interestRate}
        minPayment={mockItem.minPayment} />
    );
  }
}*/

export default DisplayLineItemContainer;
