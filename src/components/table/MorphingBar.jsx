import React from 'react';
import IconWrapper from './IconWrapper';

const MorphingBar = props => (
  <IconWrapper>
    <icon
      className="button button-primary"
      aria-hidden="true"
      onClick={props.onSaveChanges}
    > Save
    </icon>
    <icon
      className="button button-normal"
      aria-hidden="true"
      onClick={props.onDeleteChanges}
    > Revert
    </icon>
  </IconWrapper>
);

MorphingBar.propTypes = {
  onDeleteChanges: React.PropTypes.func.isRequired,
  onSaveChanges: React.PropTypes.func.isRequired,
};

export default MorphingBar;
