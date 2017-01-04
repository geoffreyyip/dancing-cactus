import React from 'react';
import styles from '../../styles/tableStyles';

// decorate direct child elements with flexbox styling
const FlexboxWrapper = (props) => {
  const flexWrapper = child => (
    <div style={styles.lineItem}>
      {child}
    </div>
  );
  const items = React.Children.map(props.children, flexWrapper);
  return (
    <div style={styles.lineWrapper}>
      {items}
    </div>
  );
};

FlexboxWrapper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node.isRequired),
};

export default FlexboxWrapper;
