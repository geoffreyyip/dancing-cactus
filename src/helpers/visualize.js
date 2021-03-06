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

const getAxisScales = function getAxisScales(startingDebt, numMonths, width, height) {
  const xScale = d3.scaleLinear()
    .domain([0, numMonths])
    .rangeRound([0, width]);

  // I wrote height - 0.0001 b/c y-axis was extending past the origin and
  // intersecting the 0 tick on the x-axis. I have no idea how to fix it.
  const yScale = d3.scaleLinear()
    .domain([0, startingDebt])
    .rangeRound([height - 0.0001, 0]);  // -0.0001 is a hack, see note above
  return { x: xScale, y: yScale };
};

/**
 * Calculate payment schedule for user supplied debts and chart how the
 * total amount decreases over time.
 *
 * @param  {node} DOM - Show where to render chart
 * @param  {Array} debts - Has a payment schedule per debt
 * @param  {number} accelerator - Extra monthly amount a user wishes to pay
 * @param  {string} payoffMethod - Specify which debts to prioritze
 * @modify - Render result on DOM argument
 */
const chartTotalDebtOverTime = function chartTotalDebtOverTime(
  DOM,
  debts,
  accelerator = 0,
  payoffMethod,
) {
  // get a payment schedule for total debts
  const schedule = getPaymentSchedule(debts, accelerator, payoffMethod);
  const scenario = addDebtsTogether(schedule);

  const chart = DOM;
  const width = chart.attr('width');
  const height = chart.attr('height');
  chart.selectAll('*').remove();

  // add tooltip
  const tooltip = d3.select('.Graph').append('div')
    .attr('class', 'SVGTooltip SVGTooltip-Total');

  // set x-axis and y-axis
  const maxMonths = getPaymentSchedule(debts, 0, payoffMethod)[0].schedule.length;
  const startingDebt = scenario[0];
  const { x, y } = getAxisScales(startingDebt, maxMonths, width, height);

  // create x-axis
  chart.append('g')
      .attr('class', 'axis axis-bottom')
      .attr('transform', `translate(0, ${height})`)
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

  const currColor = 'steelblue';
  chart.append('path')
    .datum(scenario)
    .attr('d', area)
    .attr('class', 'area')
    .style('fill', `${currColor}`)
    .style('fill-opacity', '0.3')
    .on('mouseover', () => {
      tooltip
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`)
        .style('border', `1px solid ${currColor}`)
        .style('color', currColor)
        .style('display', 'inline-block')
        .html('Total Debt');
    })
    .on('mouseout', () => {
      tooltip
        .style('display', 'none');
    });

  chart.append('path')
    .datum(scenario)
    .attr('d', line)
    .style('stroke', `${currColor}`)
    .style('fill', 'none');
};

const chartIndividualDebtsOverTime = function chartIndividualDebtsOverTime(
  DOM,
  debts,
  accelerator = 0,
  payoffMethod,
) {
  // generate individual payment schedules per debt
  const dues = getPaymentSchedule(debts, accelerator, payoffMethod);

  // set SVG node
  const chart = DOM;
  const width = chart.attr('width');
  const height = chart.attr('height');
  chart.selectAll('*').remove();

  // add tooltip
  const tooltip = d3.select('.Graph').append('div')
    .attr('class', 'SVGTooltip SVGTooltip-Indvidual');

  // set x-axis and y-axis
  // maxMonths shows the months it would take to pay off at 0 accelerator
  // TODO: factor out the " get months to payoff debt with 0 accelerator" logic
  const maxMonths = getPaymentSchedule(debts, 0, payoffMethod)[0].schedule.length;
  const highestDebt = dues.reduce((prev, curr) => {
    const currDebt = curr.schedule[0].leftover;
    return Math.max(currDebt, prev);
  }, 0);
  const { x, y } = getAxisScales(highestDebt, maxMonths, width, height);

  // create x-axis
  chart.append('g')
      .attr('class', 'axis axis-bottom')
      .attr('transform', `translate(0, ${height})`)
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

  // each schedule represents the paying down of debt over time
  const defaultColors = colors.slice();

  // order dues from highest starting balance to lowest
  const sortedDues = dues.sort((prev, curr) => (
    curr.schedule[0].leftover - prev.schedule[0].leftover
  ));
  sortedDues.forEach((debt) => {
    const currColor = defaultColors.pop() || 'steelblue';
    const balanceOverTime = debt.schedule.map(month => month.leftover);
    chart.append('path')
      .datum(balanceOverTime)
      .attr('d', area)
      .attr('class', 'area')
      .style('fill', `${currColor}`)
      .style('fill-opacity', '0.3')
      .on('mouseover', () => {
        tooltip
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`)
          .style('display', 'inline-block')
          .style('color', currColor)
          .style('border', `1px solid ${currColor}`)
          .html(`${debt.name}`);
      })
      .on('mouseout', () => {
        tooltip
          .style('display', 'none');
      });

    chart.append('path')
      .datum(balanceOverTime)
      .attr('d', line)
      .attr('class', 'line')
      .style('stroke', `${currColor}`)
      .style('fill', 'none');
  });
};

const chartDebtsOverTime = function chartDebtsOverTime(
  DOM,
  debts,
  accelerator = 0,
  payoffMethod,
  chartMode = 'total',
) {
  if (chartMode === 'total') {
    chartTotalDebtOverTime(DOM, debts, accelerator, payoffMethod);
  } else if (chartMode === 'individual') {
    chartIndividualDebtsOverTime(DOM, debts, accelerator, payoffMethod);
  } else {
    throw Error('Invalid chartMode. Expected "total" or "individual" Received: ', chartMode);
  }
};

export default chartDebtsOverTime;
