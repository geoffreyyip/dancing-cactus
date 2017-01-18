import React from 'react';
import * as d3 from 'd3';
import AcceleratorBar from './AcceleratorBar';
import { chartTotalDebtOverTime } from '../../helpers/visualize';

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
      chartTotalDebtOverTime(g, this.props.debts, this.state.accelerator);
    }
  }

  shouldComponentUpdate(nextProps) {
    const g = d3.select('g');
    if (isEmpty(nextProps.debts)) {
      g.selectAll('*').remove();  // clear graph
    } else {
      chartTotalDebtOverTime(g, this.props.debts, this.state.accelerator);
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
