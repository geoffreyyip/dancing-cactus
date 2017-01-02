import React from 'react';
import styles from '../../styles/tableStyles';

// TODO: rename all "props" variables to something more semantic
// here I'd want to call it loan
const DisplayLineItem = props => (
  <div style={styles.lineWrapper}>
    <div style={styles.lineItem}>{props.name}</div>
    <div style={styles.lineItem}>{props.amount}</div>
    <div style={styles.lineItem}>{props.interestRate}</div>
    <div style={styles.lineItem}>{props.minPayment}</div>
  </div>
);

DisplayLineItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
};

export default DisplayLineItem;
