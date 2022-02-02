import { isDate } from '../../utils/shared';

export function getDate(range) {
  const [max, min] = range;
  const values = [];
  // eslint-disable-next-line no-plusplus
  for (let i = min; i <= max; i++) {
    let value = `${i}`;
    if (i < 10) {
      value = `0${i}`;
    }
    values.push(value);
  }
  return values;
}

export function getMonthLastDate(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

export function formatDate(date) {
  if (!isDate(date)) return date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return {
    year,
    month,
    date: day,
    hour,
    minute,
  };
}
