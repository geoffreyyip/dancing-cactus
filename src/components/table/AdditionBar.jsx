import React from 'react';
import IconWrapper from './IconWrapper';

const AdditionBar = () => (
  <IconWrapper>
    <icon className="fa-plus" aria-hidden="true" onClick="handleNewDebt"> Add </icon>
    <icon className="fa-ban" aria-hidden="true" onClick="handleClearState"> Reset </icon>
  </IconWrapper>
);

AdditionBar.propTypes = {
  handleNewDebt: React.PropTypes.func.isRequired,
  handleClearState: React.PropTypes.func.isRequired,
};

export default AdditionBar;
