import React from 'react';
import * as d3 from 'd3';
import chartAgainstAccelerator from '../../helpers/visualize';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svgWidth: 960,
      svgHeight: 500,
      margin: { top: 50, right: 50, bottom: 20, left: 50 },
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const topM = this.state.margin.top;
    const rightM = this.state.margin.right;
    const leftM = this.state.margin.left;
    const bottomM = this.state.margin.bottom;

    const width = this.state.svgWidth - leftM - rightM;
    const height = this.state.svgHeight - topM - bottomM;

    d3.select('svg')
      .append('g')
        .attr('transform', `translate(${leftM},${topM})`)
        .attr('width', `${width}`)
        .attr('height', `${height}`)
        .call(chartAgainstAccelerator, this.props.debts);
  }

  shouldComponentUpdate(nextProps) {
    d3.select('svg')
      .select('g')
      .call(chartAgainstAccelerator, nextProps.debts);
    return false;
  }

  render() {
    return (
      <div>
        <svg width={this.state.svgWidth} height={this.state.svgHeight} />
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
