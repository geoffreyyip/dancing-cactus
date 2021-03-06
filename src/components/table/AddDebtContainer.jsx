import React from 'react';
import LineWrapper from './LineWrapper';
import AdditionBar from './AdditionBar';

const propTypes = {
  onNewDebt: React.PropTypes.func.isRequired,
  fields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.func.isRequired,
    }),
  ),
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
    this.addNewDebtIfEnterKeyPressed = this.addNewDebtIfEnterKeyPressed.bind(this);
  }

  addNewDebt() {
    const newDebt = {};
    this.props.fields.forEach((field) => {
      const fieldName = field.name;
      newDebt[fieldName] = this.state[fieldName];
    });
    this.props.onNewDebt(newDebt);
    this.clearState();
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

  // add a keyboard shortcut for addNewDebt; mimics the Add button
  addNewDebtIfEnterKeyPressed(event) {
    const enterKey = 13;
    if (event.keyCode === enterKey) {
      this.addNewDebt();
    }
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
        className="tableCell tableCell-add"
        placeholder={field.name}
        key={index}
        onChange={this.handleChangeTo(field.name)}
        onKeyUpCapture={this.addNewDebtIfEnterKeyPressed}
        value={this.state[field.name]}
      />
    ));
    return (
      <div className="AddDebtContainer">
        <LineWrapper>
          {inputItems}
          <AdditionBar
            handleNewDebt={this.addNewDebt}
            handleClearState={this.clearState}
          />
        </LineWrapper>
      </div>
    );
  }
}

AddDebtContainer.propTypes = propTypes;

export default AddDebtContainer;
