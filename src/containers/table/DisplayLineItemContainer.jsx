import React from 'react';
import DisplayLineItem from '../../components/table/DisplayLineItem';

const DisplayLineItemContainer = props => (
  <DisplayLineItem
    name={props.name}
    amount={props.amount}
    interestRate={props.interestRate}
    minPayment={props.minPayment}
  />
);

DisplayLineItemContainer.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
};

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
