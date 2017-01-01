import React from 'react';
import AdditionBar from './AdditionBar';

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

const AdditionLineItem = () => (
  <div style={styles.lineWrapper}>
    <input style={styles.lineItem} />
    <input style={styles.lineItem} />
    <input style={styles.lineItem} />
    <input style={styles.lineItem} />
    <AdditionBar />
  </div>
);

export default AdditionLineItem;
