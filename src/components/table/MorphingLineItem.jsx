import React from 'react';
import MorphingBar from './MorphingBar';

const styles = {
  lineWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minWidth: '500px',
  },
  lineItem: {
    flex: 1,
  },
};

const MorphingLineItem = props => (
  <div style={styles.lineWrapper}>
    <div style={styles.lineItem}>{props.name}</div>
    <div style={styles.lineItem}>{props.amount}</div>
    <div style={styles.lineItem}>{props.interestRate}</div>
    <div style={styles.lineItem}>{props.minPayment}</div>
    <MorphingBar />
  </div>
);

MorphingLineItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  interestRate: React.PropTypes.number.isRequired,
  minPayment: React.PropTypes.number.isRequired,
};

export default MorphingLineItem;
