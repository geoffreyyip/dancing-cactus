import React from 'react';

const MorphingBar = props => (
  <div>
    <i className="fa fa-floppy-o" aria-hidden="true" />
    <i className="fa fa-undo" aria-hidden="true" onClick={props.onDeleteChanges} />
  </div>
);

MorphingBar.propTypes = {
  onDeleteChanges: React.PropTypes.func.isRequired,
};

export default MorphingBar;
