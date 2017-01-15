import React from 'react';

// decorate child elements with LineWrapper CSS
const LineWrapper = (props) => {
  const flexWrapper = child => (
    <div className="LineItem">
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

LineWrapper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node.isRequired),
};

export default LineWrapper;
