import React from 'react';
import MorphingBar from './MorphingBar';
import styles from '../../styles/tableStyles';

/*
const MorphingLineItem = props => (
  <div style={styles.lineWrapper}>
    <div style={styles.lineItem}>{props.name}</div>
    <div style={styles.lineItem}>{props.amount}</div>
    <div style={styles.lineItem}>{props.interestRate}</div>
    <div style={styles.lineItem}>{props.minPayment}</div>
    <MorphingBar />
  </div>
);
*/

class MorphingLineItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      amount: props.amount,
      interestRate: props.interestRate,
      minPayment: props.minPayment,
    };

    this.clearPendingChanges = this.clearPendingChanges.bind(this);
  }

  clearPendingChanges() {
    this.props.handleDeleteChanges();
  }

  render() {
    return (
      <div style={styles.lineWrapper}>
        <div style={styles.lineItem}>{this.props.name}</div>
        <div style={styles.lineItem}>{this.props.amount}</div>
        <div style={styles.lineItem}>{this.props.interestRate}</div>
        <div style={styles.lineItem}>{this.props.minPayment}</div>
        <MorphingBar onDeleteChanges={this.clearPendingChanges} />
      </div>
    );
  }
}

MorphingLineItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
  handleDeleteChanges: React.PropTypes.func.isRequired,
};

export default MorphingLineItem;
