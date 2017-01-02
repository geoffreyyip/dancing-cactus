import React from 'react';
import AdditionLineItem from '../../components/table/AdditionLineItem';

// class AdditionLineItemContainer extends React.Component {
//   constructor(props) {
//     super(props)


//   }

//   render() {
//     return (
//       <AdditionLineItem onNewDebt={this.props.handleNewDebt} />
//       <AdditionBar />
//     )
//   }
// }

const AdditionLineItemContainer = props => (
  <div>
    <AdditionLineItem onNewDebt={props.handleNewDebt} />
  </div>
);

AdditionLineItemContainer.propTypes = {
  handleNewDebt: React.PropTypes.func.isRequired,
};

export default AdditionLineItemContainer;
