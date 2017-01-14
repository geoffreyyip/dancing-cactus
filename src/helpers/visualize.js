import * as d3 from 'd3';
import { getPaymentSchedule } from './paymentSchedule';

const colors = [
  'steelblue',
  'crimson',
  'goldenrod',
  'seagreen',
  'rebeccapurple',
];

/**
 * Combines all debts together into a single payment
 * schedule. Good for visualizing how different accelerators
 * help speed up the payment of debt.
 *
 * @param  {Object} debts - Has payment schedules per debt
 * @return {Object} - Generate payment schedule per month
 */
const addDebtsTogether = function addDebtsTogether(debts) {
  // discard anything that's not a payment schedule
  const schedules = debts.map(debt => debt.schedule);

  // discard payment info; extract remaining balance info
  const liabilities = schedules.map(schedule => (
    schedule.map(month => month.leftover)
  ));

  // combine debts by month
  const debtsByMonth = liabilities.reduce((prev, curr) => (
    curr.map((monthlyPayment, month) => monthlyPayment + prev[month])
  ));

  return debtsByMonth;
};
/*
/**
 * Charts a single payment schedule on SVG.
 *
 * @param  {Object} debts - Shows remaining balance per month
 * @param  {SVG} chart - says which DOM node to graph on
 * @param  {d3.scale} x - Scales data to display
 * @param  {d3.scale} y - Scales data to display
 * @return {Object} - a SVG element

const graphTotalBalance = function (months, chart, x, y) {

};

const getSVGNode = function () {
  const svg = d3.select('svg');
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = Number(svg.attr('width')) - margin.left - margin.right;
  const height = Number(svg.attr('height')) - margin.top - margin.bottom;

  return svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
};
*/

const chartAgainstAccelerator = function chartAgainstAccelerator(
  DOM,
  debts,
  accelerators,
  payoffMethod,
) {
  // generate payment plans based on extra money user wants to pay per month
  const options = accelerators || [0, 200, 400, 600, 800];
  const scenarios = options.map(extra =>
    getPaymentSchedule(debts, extra, payoffMethod)).map(schedule =>
      addDebtsTogether(schedule));

  // set SVG node
  const chart = DOM;
  const width = chart.attr('width');
  const height = chart.attr('height');
  chart.selectAll('*').remove();

  // set x-scale
  const numMonths = scenarios[0].length;
  const x = d3.scaleLinear()
    .domain([0, numMonths])
    .rangeRound([0, width]);

  // set y-scale
  const startingDebt = scenarios[0][0];
  const y = d3.scaleLinear()
    .domain([0, startingDebt])
    .rangeRound([height, 0]);

  // create x-axis
  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .style('font-family', 'Ubuntu')
    .call(d3.axisBottom(x));

  // create y-axis
  chart.append('g')
    .attr('class', 'y axis')
    .style('font-family', 'Ubuntu')
    .call(d3.axisLeft(y))
  .append('text')
    .attr('fill', '#000')
    .attr('transform', 'translate(20, -30)')
    .attr('dy', '.71em')
    .style('font-size', '1.5em')
    .style('font-weight', 'bold')
    .text('Debts ($)');

  const area = d3.area()
    .x((d, i) => x(i))
    .y0(height)
    .y1(d => y(d));

  const line = d3.line()
    .x((d, i) => x(i))
    .y(d => y(d));

  // each scenario represents the paying down of debt over time
  const defaultColors = colors.slice();
  scenarios.forEach((scenario) => {
    const currColor = defaultColors.pop() || 'steelblue';
    chart.append('path')
      .datum(scenario)
      .attr('d', area)
      .attr('class', 'area')
      .style('fill', `${currColor}`)
      .style('fill-opacity', '0.1');

    chart.append('path')
      .datum(scenario)
      .attr('d', line)
      .attr('class', 'line')
      .style('stroke', `${currColor}`)
      .style('fill', 'none');
  });
};

export default chartAgainstAccelerator;
