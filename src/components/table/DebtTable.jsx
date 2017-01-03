import React from 'react';
import DisplayLineItemContainer from '../../containers/table/DisplayLineItemContainer';
import MorphingLineItemContainer from '../../containers/table/MorphingLineItemContainer';
import AdditionLineItemContainer from '../../containers/table/AdditionLineItemContainer';
import MorphingBar from './MorphingBar';
import ModificationBar from './ModificationBar';
import styles from '../../styles/tableStyles';

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.getMorphingLine = this.getMorphingLine.bind(this);
    this.getDisplayLine = this.getDisplayLine.bind(this);
  }

  // MorphingLineItemContainer and its children can be thought of as
  // controlled components, whose local values are synced up with the
  // Main.jsx state via passed in callbacks, also defined in Main.jsx
  // Callbacks are generated with a morphingHandler method, which binds
  // an index and a field name to each line item component. The index
  // corresponds to the Debt object's position in the Main.jsx state.

  // renders an input field for each category in the debt table
  getMorphingLine(loan, lineNo) {
    return (
      <MorphingLineItemContainer style={styles.lineWrapper} key={loan.id}>
        {this.props.headerInfo.map((category, fieldNo) => (
          <input
            key={fieldNo}
            style={styles.lineItem}
            value={loan.pendingChanges.name}
            onChange={this.props.morphingHandler(lineNo, category.name).handleEditChanges}
          />
        ))};
        <MorphingBar
          onDeleteChanges={this.props.morphingHandler(lineNo).handleDeleteChanges}
          onSaveChanges={this.props.morphingHandler(lineNo).handleSaveChanges}
        />
      </MorphingLineItemContainer>
    );
  }

  // renders a div element for each category in the debt table
  getDisplayLine(loan, index) {
    return (
      <DisplayLineItemContainer style={styles.lineWrapper} key={loan.id}>
        {this.props.headerInfo.map((category, fieldNo) => (
          <div key={fieldNo} style={styles.lineItem}>
            {loan[category.name]}
          </div>
        ))};
        <ModificationBar
          onDeleteItem={this.props.deleteHandler(index).handleDeleteItem}
        />
      </DisplayLineItemContainer>

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
        <AdditionLineItemContainer handleNewDebt={this.props.handleNewDebt} />;
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
  morphingHandler: React.PropTypes.func.isRequired,
  deleteHandler: React.PropTypes.func.isRequired,
};

export default DebtTable;
