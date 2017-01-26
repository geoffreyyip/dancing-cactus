import React from 'react';

const propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};

const IconWrapper = (props) => {
  const flexWrapper = child => (
    <div className="IconWrapper-button">
      {child}
    </div>
  );
  const icons = React.Children.map(props.children, flexWrapper);
  return (
    <div className="IconWrapper">
      {icons}
    </div>
  );
};

IconWrapper.propTypes = propTypes;

export default IconWrapper;
