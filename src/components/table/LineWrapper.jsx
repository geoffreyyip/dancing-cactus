import React from 'react';

const propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node.isRequired),
};

// decorate child elements with LineWrapper CSS
const LineWrapper = (props) => {
  const flexWrapper = child => (
    <div className="LineWrapper-cell">
      {child}
    </div>
  );
  const items = React.Children.map(props.children, flexWrapper);
  return (
    <div className="LineWrapper">
      {items}
    </div>
  );
};

LineWrapper.propTypes = propTypes;

export default LineWrapper;
