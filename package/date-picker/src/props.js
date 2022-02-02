import { oneOf, isDate } from '../../utils/shared';

export const DATE = 'date';
export const YEAR = 'year';
export const MONTH = 'month';
export const TIME = 'time';
export const DATE_TIME = 'datetime';
const DEFAULT_TYPE = DATE;

const DEFAULT_CURRENT_DATE = new Date();
const MAX_YEAR = DEFAULT_CURRENT_DATE.getFullYear() + 10;
const MIN_YEAR = DEFAULT_CURRENT_DATE.getFullYear() - 10;
export default {
  type: {
    type: String,
    default: DEFAULT_TYPE,
    validator(value) {
      return oneOf(value, [DATE, YEAR, MONTH, TIME, DATE_TIME]);
    },
  },
  currentDate: {
    type: Date,
    default: () => DEFAULT_CURRENT_DATE,
    validator: (value) => isDate(value),
  },
  max: {
    type: Date,
    default: () => new Date(MAX_YEAR, 11, 31, 23, 59),
    validator: (value) => isDate(value),
  },
  min: {
    type: Date,
    default: () => new Date(MIN_YEAR, 0, 1, 0, 0),
    validator: (value) => isDate(value),
  },
  filter: {
    type: Function,
    default: (type, values) => values,
  },
  formatter: {
    type: Function,
    default: (type, values) => values,
  },
};
