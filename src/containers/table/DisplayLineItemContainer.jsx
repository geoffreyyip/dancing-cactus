import React from 'react';
import DisplayLineItem from '../../components/table/DisplayLineItem';
import ModificationBar from '../../components/table/ModificationBar';

const DisplayLineItemContainer = props => (
  <div>
    <DisplayLineItem
      name={props.name}
      amount={props.amount}
      interestRate={props.interestRate}
      minPayment={props.minPayment}
    />
    <ModificationBar onDeleteItem={props.handleDeleteItem} />
  </div>
);

DisplayLineItemContainer.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
  handleDeleteItem: React.PropTypes.func.isRequired,
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
