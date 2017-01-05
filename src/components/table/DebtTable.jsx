import React from 'react';
import FlexboxWrapper from './FlexboxWrapper';
import AddDebtContainer from './AddDebtContainer';
import MorphingBar from './MorphingBar';
import ModificationBar from './ModificationBar';

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
  morphingLine: Object.assign({
    border: '',
  }, cellItemBase),
  displayLine: Object.assign({
    borderTop: 'solid 1px grey',
    borderBottom: 'solid 1px grey',
    borderLeft: 'none',
    borderRight: 'none',
  }, cellItemBase),
  headerLine: Object.assign({
    fontWeight: 'bold',
    background: 'darkgrey',
  }, cellItemBase),
};

class DebtTable extends React.Component {
  constructor(props) {
    super(props);

    this.getMorphingLine = this.getMorphingLine.bind(this);
    this.getDisplayLine = this.getDisplayLine.bind(this);
  }

  /*
  Create controlled components that sync up to Main.jsx state with
  changeHandlers's methods. Methods are bound to an given loan object
  (and optionally a field) at render time.

  Pass down callbacks to delete and save pending changes to a trash
  and an arrow-back icon respectively.
  */
  getMorphingLine(loan, lineNo) {
    // render an input field for each category in the debt table
    const lineItem = this.props.headerInfo.map((category, fieldNo) => (
      <input
        style={styles.morphingLine}
        key={fieldNo}
        value={loan.pendingChanges[category.name]}
        onChange={this.props.changeHandlers(lineNo, category.name).handleEditChanges}
      />
    ));

    return (
      <FlexboxWrapper key={lineNo}>
        {lineItem}
        <MorphingBar
          onDeleteChanges={this.props.changeHandlers(lineNo).handleDeleteChanges}
          onSaveChanges={this.props.changeHandlers(lineNo).handleSaveChanges}
        />
      </FlexboxWrapper>
    );
  }

  /*
  Pass down callbacks to edit and delete debt entrys to a pencil and
  trash icon respectively.
  */
  getDisplayLine(loan, lineNo) {
    // render a div element for each category in the debt table
    const lineItem = this.props.headerInfo.map((category, fieldNo) => (
      <div key={fieldNo} style={styles.displayLine}>
        {loan[category.name]}
      </div>
    ));

    return (
      <FlexboxWrapper key={lineNo}>
        {lineItem}
        <ModificationBar
          onDeleteItem={this.props.deleteHandler(lineNo).handleDeleteItem}
          onStartChanges={this.props.changeHandlers(lineNo).handleChangeItem}
        />
      </FlexboxWrapper>

    );
  }

  getHeaderLine() {
    const lineItem = this.props.headerInfo.map((category, fieldNo) => (
      <div key={fieldNo} style={styles.headerLine}>
        {category.displayString}
      </div>
    ));
    return (
      <FlexboxWrapper>
        {lineItem}
      </FlexboxWrapper>
    );
  }

  /*
  For each Debt object in Main.jsx state, check whether pending changes exist.
  Render a display line item for Debt objects without pending changes.
  Render a morphing line item for Debt objects with pending changes.
  Attach an AddDebtContainer at the end; pass down callback to add a new debt.
  */
  render() {
    const lines = this.props.debts.map((loan, index) => {
      const has = Object.prototype.hasOwnProperty;
      const hasPendingChanges = has.call(loan, 'pendingChanges');
      return (
        hasPendingChanges
        ? this.getMorphingLine(loan, index)
        : this.getDisplayLine(loan, index)
      );
    });
    const header = this.getHeaderLine();
    return (
      <div
        style={{
          fontSize: '20px',
          fontFamily: 'Ubuntu',
          minWidth: '900px',
        }}
      >
        {header}
        {lines}
        <AddDebtContainer onNewDebt={this.props.handleNewDebt} fields={this.props.headerInfo} />
      </div>
    );
  }
}

DebtTable.propTypes = {
  debts: React.PropTypes.arrayOf(
    React.PropTypes.shape({
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
