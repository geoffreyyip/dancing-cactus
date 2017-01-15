import React from 'react';
import IconWrapper from './IconWrapper';

const AdditionBar = props => (
  <IconWrapper>
    <icon
      className="fa-plus button button-primary"
      aria-hidden="true"
      onClick={props.handleNewDebt}
    > Add
    </icon>
    <icon
      className="fa-ban button button-normal"
      aria-hidden="true"
      onClick={props.handleClearState}
    > Reset
    </icon>
  </IconWrapper>
);

AdditionBar.propTypes = {
  handleNewDebt: React.PropTypes.func.isRequired,
  handleClearState: React.PropTypes.func.isRequired,
};

export default AdditionBar;
