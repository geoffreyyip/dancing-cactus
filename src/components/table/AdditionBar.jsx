import React from 'react';
import IconWrapper from './IconWrapper';

const propTypes = {
  handleNewDebt: React.PropTypes.func.isRequired,
  handleClearState: React.PropTypes.func.isRequired,
};

const AdditionBar = props => (
  <IconWrapper>
    <icon
      className="button button-primary"
      aria-hidden="true"
      onClick={props.handleNewDebt}
    > Add
    </icon>
    <icon
      className="button button-normal"
      aria-hidden="true"
      onClick={props.handleClearState}
    > Reset
    </icon>
  </IconWrapper>
);

AdditionBar.propTypes = propTypes;

export default AdditionBar;
