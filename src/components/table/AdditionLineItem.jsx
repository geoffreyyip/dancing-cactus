import React from 'react';
import AdditionBar from './AdditionBar';
import styles from '../../styles/tableStyles';


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
