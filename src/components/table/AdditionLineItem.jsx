import React from 'react';
import styles from '../../styles/tableStyles';


class AdditionLineItem extends React.Component {
  constructor(props) {
    super(props);

    // good refactoring opportunity here
    // todo: factor out input fields into their own components
    this.state = {
      name: 'college',
      amount: '2200',
      interestRate: '0.05',
      minPayment: '85',
    };
    this.addNewDebt = this.addNewDebt.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleInterestChange = this.handleInterestChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
  }

  // fixit: this method's spagetti, future developers will have to
  // coordinate changes between here and Main's onNewDebt method

  // the difficulty stems from onNewDebt's lack of type coercion and checking
  // onNewDebt requires an object with specific properties, name, amount, etc.
  // this method will need to ensure a proper input and notify user of errors
  addNewDebt() {
    const newDebt = {
      name: this.state.name,
      amount: Number(this.state.amount),
      interestRate: Number(this.state.interestRate),
      minPayment: Number(this.state.minPayment),
    };
    this.props.onNewDebt(newDebt);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleInterestChange(event) {
    this.setState({ interestRate: event.target.value });
  }

  handlePaymentChange(event) {
    this.setState({ minPayment: event.target.value });
  }

  render() {
    return (
      <div style={styles.lineWrapper}>
        <input
          style={styles.lineItem}
          onChange={this.handleNameChange}
          value={this.state.name}
        />
        <input
          style={styles.lineItem}
          onChange={this.handleAmountChange}
          value={this.state.amount}
        />
        <input
          style={styles.lineItem}
          onChange={this.handleInterestChange}
          value={this.state.interestRate}
        />
        <input
          style={styles.lineItem}
          onChange={this.handlePaymentChange}
          value={this.state.minPayment}
        />
        <div className="addition-bar" style={styles.lineItem}>
          <i className="fa fa-plus" aria-hidden="true" onClick={this.addNewDebt}> Add </i>
          <i className="fa fa-ban" aria-hidden="true"> Reset </i>
        </div>
      </div>
    );
  }
}

AdditionLineItem.propTypes = {
  onNewDebt: React.PropTypes.func.isRequired,
};

export default AdditionLineItem;
