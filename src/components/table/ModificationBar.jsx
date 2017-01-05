import React from 'react';
import '../../styles/font-awesome-4.7.0/css/font-awesome.css';
import IconWrapper from './IconWrapper';

const ModificationBar = props => (
  <IconWrapper>
    <icon className="fa-pencil" aria-hidden="true" onClick={props.onStartChanges}> Edit </icon>
    <icon className="fa-trash" aria-hidden="true" onClick={props.onDeleteItem}> Delete </icon>
  </IconWrapper>
);

ModificationBar.propTypes = {
  onDeleteItem: React.PropTypes.func.isRequired,
  onStartChanges: React.PropTypes.func.isRequired,
};

export default ModificationBar;
