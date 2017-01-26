import React from 'react';
import IconWrapper from './IconWrapper';

const propTypes = {
  onDeleteItem: React.PropTypes.func.isRequired,
  onStartChanges: React.PropTypes.func.isRequired,
};

const ModificationBar = props => (
  <IconWrapper>
    <icon
      className="button button-primary"
      aria-hidden="true"
      onClick={props.onStartChanges}
    > Edit
    </icon>

    <icon
      className="button button-normal"
      aria-hidden="true"
      onClick={props.onDeleteItem}
    > Delete
    </icon>
  </IconWrapper>
);

ModificationBar.propTypes = propTypes;

export default ModificationBar;
