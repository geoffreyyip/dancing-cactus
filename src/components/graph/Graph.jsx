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
  }


  componentDidMount() {
    const topM = this.state.margin.top;
    const rightM = this.state.margin.right;
    const leftM = this.state.margin.left;
    const bottomM = this.state.margin.bottom;

    const width = this.state.svgWidth - leftM - rightM;
    const height = this.state.svgHeight - topM - bottomM;

    const g = d3.select('svg')
        .style('position', 'relative')
        .style('left', `-${leftM}`)
      .append('g')
        .attr('transform', `translate(${leftM},${topM})`)
        .attr('width', `${width}`)
        .attr('height', `${height}`);

    if (!isEmpty(this.props.debts)) {
      g.call(chartTotalDebtOverTime, this.props.debts, this.state.accelerator);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (isEmpty(nextProps.debts)) {
      d3.select('svg')
        .select('g')
        .selectAll('*')
        .remove();
    } else {
      d3.select('svg')
        .select('g')
        .call(chartTotalDebtOverTime, nextProps.debts, this.state.accelerator);
    }
    return false;
  }

  handleNewAccelerator(accelerator) {
    this.setState({ accelerator });
  }

  render() {
    return (
      <div className="Graph">
        <svg width={this.state.svgWidth} height={this.state.svgHeight} />
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
