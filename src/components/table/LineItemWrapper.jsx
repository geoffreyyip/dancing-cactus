import React from 'react';
import styles from '../../styles/tableStyles';

const LineItemWrapper = (props) => {
  const addLineItemStyle = child => React.cloneElement(child, { style: styles.lineItem });
  const items = React.Children.map(props.children, addLineItemStyle);
  return (
    <div style={styles.lineWrapper}>
      {items}
    </div>
  );
};

LineItemWrapper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node.isRequired),
};

export default LineItemWrapper;
