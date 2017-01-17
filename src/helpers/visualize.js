import * as d3 from 'd3';
import { getPaymentSchedule } from './paymentSchedule';

const yellow = '#ffb900';
const red = '#e81123';
const blue = '#0078d7';
const purple = '#5c2d91';
const green = '#107c10';

const colors = [
  blue,
  red,
  yellow,
  green,
  purple,
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
  // I wrote height - 0.0001 b/c y-axis was extending past the origin and
  // intersecting the 0 tick on the x-axis. I have no idea how to fix it.
  const startingDebt = scenarios[0][0];
  const y = d3.scaleLinear()
    .domain([0, startingDebt])
    .rangeRound([height - 0.0001, 0]);  // -0.0001 is a hack, see note above

  // create x-axis
  chart.append('g')
      .attr('class', 'axis axis-bottom')
      .attr('transform', `translate(0, ${height})`)
      .style('font-family', 'Ubuntu')
      .call(d3.axisBottom(x))
    .append('text')
      .attr('class', 'label label-bottom')
      .attr('fill', '#000')
      .attr('transform', `translate(${width / 2}, 40)`)
      .attr('dx', '1.5em')
      .style('font-size', '1.5em')
      .text('Months');

  // create y-axis
  chart.append('g')
    .attr('class', 'axis axis-left')
    .style('font-family', 'Ubuntu')
    .call(d3.axisLeft(y))
  .append('text')
    .attr('class', 'label label-left')
    .attr('fill', '#000')
    .attr('transform', 'translate(20, -30)')
    .attr('dy', '.71em')
    .style('font-size', '1.5em')
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
      .style('fill-opacity', '0.3');

    chart.append('path')
      .datum(scenario)
      .attr('d', line)
      .attr('class', 'line')
      .style('stroke', `${currColor}`)
      .style('fill', 'none');
  });
};

export default chartAgainstAccelerator;
