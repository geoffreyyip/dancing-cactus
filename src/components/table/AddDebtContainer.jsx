import React from 'react';
import FlexboxWrapper from './FlexboxWrapper';
import AdditionBar from './AdditionBar';

const cellItemBase = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '5%',
  fontFamily: 'inherit',
  fontSize: '100%',
};

const styles = {
  // copies properties from second arg to first arg
  addLine: Object.assign({
    borderTop: '',
    borderBottom: '',
    borderLeft: '',
    borderRight: '',
  }, cellItemBase),
};

class AddDebtContainer extends React.Component {
  constructor(props) {
    super(props);

    // initialize a state property for each Debts field
    this.state = {};
    props.fields.forEach((field) => {
      this.state[field.name] = '';
    });

    this.addNewDebt = this.addNewDebt.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  addNewDebt() {
    const newDebt = {};
    this.props.fields.forEach((field) => {
      const fieldName = field.name;
      newDebt[fieldName] = this.state[fieldName];
    });
    this.props.onNewDebt(newDebt);
  }

  // coupled to input elements
  // assumes component has properties corresponding to this component's state
  // read the data-field property bound to the EntryCell's object, that's the key
  // read the value property, that's the new value
  // modify state
  handleChangeTo(fieldName) {
    return (event) => {
      const change = {};
      change[fieldName] = event.target.value;

      this.setState(change);
    };
  }

  // sets all state properties to empty strings
  clearState() {
    const emptyState = {};
    Object.keys(this.state).forEach((key) => {
      emptyState[key] = '';
    });

    this.setState(emptyState);
  }

  render() {
    const inputItems = this.props.fields.map((field, index) => (
      <input
        style={styles.addLine}
        placeholder={field.name}
        key={index}
        onChange={this.handleChangeTo(field.name)}
        value={this.state[field.name]}
      />
    ));
    return (
      <FlexboxWrapper>
        {inputItems}
        <AdditionBar>
          handleNewDebt={this.addNewDebt}
          handleClearState={this.clearState}
        </AdditionBar>
      </FlexboxWrapper>
    );
  }
}

AddDebtContainer.propTypes = {
  onNewDebt: React.PropTypes.func.isRequired,
  fields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.func.isRequired,
    }),
  ),
};

export default AddDebtContainer;
