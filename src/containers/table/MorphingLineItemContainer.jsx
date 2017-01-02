import React from 'react';
import MorphingLineItem from '../../components/table/MorphingLineItem';

const MorphingLineItemContainer = props => (
  <MorphingLineItem
    name={props.name}
    amount={props.amount}
    interestRate={props.interestRate}
    minPayment={props.minPayment}
    handleDeleteChanges={props.handleDeleteChanges}
  />
);

MorphingLineItemContainer.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
  handleDeleteChanges: React.PropTypes.func.isRequired,
};

/*
class MorphingLineItemContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <MorphingLineItem
        name={mockItem.name}
        amount={mockItem.amount}
        interestRate={mockItem.interestRate}
        minPayment={mockItem.minPayment} />
    );
  }
}*/

export default MorphingLineItemContainer;
