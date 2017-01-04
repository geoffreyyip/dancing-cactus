import React from 'react';
import LineItemWrapper from './LineItemWrapper';
import AdditionLineItem from './AdditionLineItem';
import MorphingBar from './MorphingBar';
import ModificationBar from './ModificationBar';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.getMorphingLine = this.getMorphingLine.bind(this);
    this.getDisplayLine = this.getDisplayLine.bind(this);
  }

  // MorphingLineItemContainer and its children can be thought of as
  // controlled components, whose local values are synced up with the
  // Main.jsx state via passed in callbacks, also defined in Main.jsx
  // Callbacks are generated with a changeHandlers method, which binds
  // an index and a field name to each line item component. The index
  // corresponds to the Debt object's position in the Main.jsx state.

  // renders an input field for each category in the debt table
  getMorphingLine(loan, lineNo) {
    const lineItems = this.props.headerInfo.map((category, fieldNo) => (
      <input
        key={fieldNo}
        value={loan.pendingChanges[category.name]}
        onChange={this.props.changeHandlers(lineNo, category.name).handleEditChanges}
      />
    ));
    return (
      <LineItemWrapper key={loan.id}>
        {lineItems}
        <MorphingBar
          onDeleteChanges={this.props.changeHandlers(lineNo).handleDeleteChanges}
          onSaveChanges={this.props.changeHandlers(lineNo).handleSaveChanges}
        />
      </LineItemWrapper>
    );
  }

  // renders a div element for each category in the debt table
  getDisplayLine(loan, index) {
    const lineItems = this.props.headerInfo.map((category, fieldNo) => (
      <div key={fieldNo}>
        {loan[category.name]}
      </div>
    ));
    return (
      <LineItemWrapper key={loan.id}>
        {lineItems}
        <ModificationBar
          onDeleteItem={this.props.deleteHandler(index).handleDeleteItem}
          onStartChanges={this.props.changeHandlers(index).handleChangeItem}
        />
      </LineItemWrapper>

    );
  }

  // checks whether each Debt object has any pending changes on it
  // renders a MorphingLineItem for those with pending changes and a
  // DisplayLineItem for those without
  // render a AdditionLineItem at the end for users to add new debts with
  render() {
    return (
      <div>
        {this.props.debts.map((loan, index) => {
          const has = Object.prototype.hasOwnProperty;
          const hasPendingChanges = has.call(loan, 'pendingChanges');
          return (
            hasPendingChanges
            ? this.getMorphingLine(loan, index)
            : this.getDisplayLine(loan, index)
          );
        })}
        <AdditionLineItem onNewDebt={this.props.handleNewDebt} />
      </div>
    );
  }
}

DebtTable.propTypes = {
  debts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number.isRequired,
      interestRate: React.PropTypes.number.isRequired,
      minPayment: React.PropTypes.number.isRequired,
      pendingChanges: React.PropTypes.shape({
        name: React.PropTypes.string,
        amount: React.PropTypes.string,
        interestRate: React.PropTypes.string,
        minPayment: React.PropTypes.string,
      }),
    })).isRequired,
  headerInfo: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.func.isRequired,
    }),
  ),
  handleNewDebt: React.PropTypes.func.isRequired,
  changeHandlers: React.PropTypes.func.isRequired,
  deleteHandler: React.PropTypes.func.isRequired,
};

export default DebtTable;
