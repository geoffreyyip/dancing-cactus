import React from 'react';
import '../../styles/font-awesome-4.7.0/css/font-awesome.css';

const ModificationBar = props => (
  <div className="modification-bar">
    <i className="fa fa-pencil" aria-hidden="true" onClick={props.onStartChanges} />
    <i className="fa fa-trash" aria-hidden="true" onClick={props.onDeleteItem} />
  </div>
);

ModificationBar.propTypes = {
  onDeleteItem: React.PropTypes.func.isRequired,
  onStartChanges: React.PropTypes.func.isRequired,
};

export default ModificationBar;
