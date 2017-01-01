import React from 'react';
import ModificationBar from './ModificationBar';
import styles from '../../styles/tableStyles';

const DisplayLineItem = props => (
  <div style={styles.lineWrapper}>
    <div style={styles.lineItem}>{props.name}</div>
    <div style={styles.lineItem}>{props.amount}</div>
    <div style={styles.lineItem}>{props.interestRate}</div>
    <div style={styles.lineItem}>{props.minPayment}</div>
    <ModificationBar />
  </div>
);

DisplayLineItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
};

export default DisplayLineItem;
