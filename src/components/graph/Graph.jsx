import React from 'react';
import * as d3 from 'd3';
import AcceleratorBar from './AcceleratorBar';
import chartDebtsOverTime from '../../helpers/visualize';

const isEmpty = function isEmpty(debts) {
  return debts.length === 0;
};

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svgWidth: 960,
      svgHeight: 500,
      margin: { top: 50, right: 50, bottom: 50, left: 50 },
      accelerator: 0,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.handleNewAccelerator = this.handleNewAccelerator.bind(this);
    this.getGrouping = this.getGrouping.bind(this);
  }


  componentDidMount() {
    if (!isEmpty(this.props.debts)) {
      const g = d3.select('g');
      this.addChart(g);
    }
  }

  /**
   * Delegate state changes to d3. Manually pass in nextProps and nextState
   * to ensure that chart visualization gets updated appropriately. Otherwise,
   * d3 will render based on state/props before the state change, creating a
   * a lag between d3 and the other React components.
   *
   * @param  {Object} nextProps [description]
   * @return {Boolean} - Return false to block React from rending this component
   */
  shouldComponentUpdate(nextProps, nextState) {
    const g = d3.select('g');
    if (isEmpty(nextProps.debts)) {
      g.selectAll('*').remove();  // clear graph
    } else {
      this.updateChart(g, nextProps, nextState);
    }
    return false;
  }

  getGrouping() {
    const margin = this.state.margin;
    const width = this.state.svgWidth - margin.left - margin.right;
    const height = this.state.svgHeight - margin.top - margin.bottom;

    return (
      <g
        transform={`translate(${margin.left},${margin.top})`}
        width={width}
        height={height}
      />
    );
  }

  addChart(grouping) {
    chartDebtsOverTime(
      grouping,
      this.props.debts,
      this.state.accelerator,
      this.state.payoffMethod,
      this.state.chartType);
  }

  updateChart(grouping, nextProps, nextState) {
    console.log(this);
    chartDebtsOverTime(
      grouping,
      nextProps.debts,
      nextState.accelerator,
      nextState.payoffMethod,
      nextState.chartType);
  }

  handleNewAccelerator(accelerator) {
    this.setState({ accelerator });
  }

  render() {
    const grouping = this.getGrouping();
    const SVGStyling = {
      position: 'relative',
      left: `-${this.state.margin.left}px`,
    };
    return (
      <div className="Graph">
        <svg
          className="SVGContainer"
          height={this.state.svgHeight}
          style={SVGStyling}
          width={this.state.svgWidth}
        >
          {grouping}
        </svg>
        <AcceleratorBar
          value={this.state.accelerator}
          onNewAccelerator={this.handleNewAccelerator}
        />
      </div>
    );
  }
}

Graph.propTypes = {
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
    }),
    ).isRequired,
};

export default Graph;
