// TODO: split this documentation across functions.

/**
 * Calculate payment schedules given a list of debts.
 *
 * Input should be an array of objects with properties of "name", "amount",
 * "interestRate", and "minPayment".
 *
 * For example:
 *   [
 *    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
 *    { name: 'College', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
 *    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
 *   ]
 *
 * A payment schedule is generated per loan. paymentSchedule should be an array of
 * objects with properties of "payment", "principal", "interest",
 * "balance". A line item is generated for each month until the leftover balance
 * hits zero
 *
 * "payment" means total payment that month
 * "principal" means principal paid that month
 * "interest" means interest paid that month
 * "leftover" means leftover balance after payment
 *
 * For example:
 *   [
 *     { payment: 620.23, principal: 585.31, interest: 34.92, leftover: 7794.46 },
 *     { payment: 620.23, principal: 587.75, interest: 32.48, leftover: 7206.71 },
 *     ...
 *     { payment: 620.23, principal: 620.23, interest: 10.07, leftover: 1805.51 },
 *     { payment: 1813.03, principal: 1805.51, interest: 7.52, leftover: 0 },
 *   ]
 *
 * Default payment schedule assumes an accelerator of 0. In other words, it assumes
 * the user is paying only the minimum amounts in month 1, and repeating that
 * payment for each month after. (Note that monthly payments per loan may not remain
 * static. If a different debt gets paid off, any monthly payments from that loan
 * will automatically get applied to a user's other loans.)
 *
 * If an accelerator is specified, that amount is applied to the debt with the
 * highest priority. If user has chosen the snowball method that means the debt with
 * the smallest leftover amount. If the user has chosen the 'avalanche' method, then
 * that means the debt with the highest interest rate.
 *
 * All payment schedules will be rolled up into a paymentSchedules object linking
 * each loan to a paymentSchedule array. This represents the final output.
 */

const SNOWBALL = 'snowball';
const AVALANCHE = 'avalanche';

// SNOWBALL means pay debts from smallest balance to largest
// AVALANCHE means pay debts from highest interest to lowest
const prioritize = function prioritize(debts, payoffMethod = SNOWBALL) {
  // shallow copy to ensure immutability of arguments
  const dues = debts.slice();

  const compareByAmount = (curr, next) => (curr.amount - next.amount);
  const compareByInterest = (curr, next) => (curr.interestRate - next.interestRate);

  if (payoffMethod === SNOWBALL) {
    dues.sort(compareByAmount);
  } else if (payoffMethod === AVALANCHE) {
    dues.slice().reverse().sort(compareByInterest);
  } else {
    throw Error('Prioritize receieved invalid payOffMethod');
  }

  return dues;
};

/**
 * A payment schedule is generated per loan. paymentSchedule should be an array of
 * objects with properties of "payment", "principal", "interest",
 * "balance". A line item is generated for each month until the leftover balance
 * hits zero
 *
 * "payment" means total payment that month
 * "principal" means principal paid that month
 * "interest" means interest paid that month
 * "leftover" means leftover balance after payment
 *
 * For example:
 *   [
 *     { payment: 620.23, principal: 585.31, interest: 34.92, leftover: 7794.46 },
 *     { payment: 620.23, principal: 587.75, interest: 32.48, leftover: 7206.71 },
 *     ...
 *     { payment: 620.23, principal: 620.23, interest: 10.07, leftover: 1805.51 },
 *     { payment: 1813.03, principal: 1805.51, interest: 7.52, leftover: 0 },
 *   ]
 * End example.
 */
const payMandatoryFees = function payMandatoryFees(leftover, minPayment, rate) {
  const result = {};
  result.payment = minPayment;

  const interest = leftover * rate;
  const principalReduction = minPayment - interest;
  const remainingBalance = leftover - principalReduction;

  result.interest = interest;
  result.principal = principalReduction;
  result.leftover = remainingBalance;

  return result;
};

/**
 * NOTE: a negative balance may exist in the month's payment,
 * this means that the mandatory monthly payment exceeded the
 * remaining balance. That surplus payment gets applied
 * towards the accelerator for future debts.
 */
const payExtra = function payExtra(month, accelerator) {
  const result = { ...month };  // shallow copy object
  let extra = accelerator;

  if (extra < month.leftover) {
    result.principal += extra;            // increases payment by extra
    result.leftover -= extra;             // reduce balance by extra
    extra = 0;                            // set extra to 0 for this cycle
  } else {
    result.principal += result.leftover;  // pay off remaining balance
    extra -= result.leftover;             // subtract from leftover
    result.leftover = 0;                  // set remaining balance to 0
  }

  return { extra, currMonth: result };
};

const last = function last(arr) {
  const lastIndex = arr.length - 1;
  return arr[lastIndex];
};

// if a debt schedule does not exist, assign amount to leftover and
// assign blank array to debt.schedule
const getLeftover = function getLeftover(debt) {
  if (debt.schedule.length === 0) {
    return debt.amount;
  }
  return last(debt.schedule).leftover;
};

const addSchedule = function addSchedule(debt) {
  return { ...debt, schedule: [] };
};

// TODO: add a month 0 object to start of every debt object to represent
// the starting amount
const getPaymentSchedule = function getPaymentSchedule(debts, accelerator = 0, payoffMethod) {
  const dues = prioritize(debts, payoffMethod).map(addSchedule);

  // repeat until all debts hit zero
  let hasRemainingDebt;
  do {
    let extra = accelerator;
    hasRemainingDebt = true;
    dues.forEach((debt) => {
      const monthlyFee = debt.minPayment;
      const rate = debt.interestRate;
      const leftover = getLeftover(debt);

      let currMonth = payMandatoryFees(leftover, monthlyFee, rate);
      ({ extra, currMonth } = payExtra(currMonth, extra));

      debt.schedule.push(currMonth);
    });

    dues.forEach((debt) => {
      if (extra) {
        let currMonth = debt.schedule.pop();
        ({ extra, currMonth } = payExtra(currMonth, extra));
        debt.schedule.push(currMonth);
      }
    });

    if (extra) hasRemainingDebt = false;
  } while (hasRemainingDebt);

  return dues;
};

export { prioritize, payMandatoryFees, getPaymentSchedule, payExtra };
