import { isDate } from '../../utils/shared.js';

function getDate(range) {
  var max = range[0],
      min = range[1];
  var values = []; // eslint-disable-next-line no-plusplus

  for (var i = min; i <= max; i++) {
    var value = "" + i;

    if (i < 10) {
      value = "0" + i;
    }

    values.push(value);
  }

  return values;
}
function getMonthLastDate(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}
function formatDate(date) {
  if (!isDate(date)) return date;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  return {
    year: year,
    month: month,
    date: day,
    hour: hour,
    minute: minute
  };
}

export { formatDate, getDate, getMonthLastDate };
