import React from 'react';

const MorphingLineItemContainer = props => (
  <div>
    {props.children}
  </div>
);

MorphingLineItemContainer.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};

export default MorphingLineItemContainer;
