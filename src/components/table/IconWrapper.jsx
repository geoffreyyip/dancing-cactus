import React from 'react';

const styles = {
  iconBar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    flexBasis: '40%',
  },
};

const IconWrapper = (props) => {
  const flexWrapper = child => (
    <div style={styles.button}>
      <div />
      {child}
    </div>
  );
  const icons = React.Children.map(props.children, flexWrapper);
  return (
    <div style={styles.iconBar}>
      {icons}
    </div>
  );
};

IconWrapper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};

export default IconWrapper;
