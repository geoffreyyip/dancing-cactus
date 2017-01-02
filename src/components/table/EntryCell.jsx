import React from 'react';
import styles from '../../styles/tableStyles';

const EntryCell = props => (
  <input
    style={styles.lineItem}
    onChange={props.onChange}
    data-field={props.field}
    value={props.display}
  />
);

EntryCell.propTypes = {
  field: React.PropTypes.string.isRequired,
  display: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default EntryCell;
