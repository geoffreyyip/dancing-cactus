import React from 'react';

const DisplayLineItemContainer = props => (
  <div>
    {props.children}
  </div>
);

DisplayLineItemContainer.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};

export default DisplayLineItemContainer;
