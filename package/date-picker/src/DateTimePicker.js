import renderMixin from './mixins/render';
import { getMonthLastDate } from './util';
import {
  DATE,
  YEAR,
  MONTH,
  DATE_TIME,
} from './props';

const maxDateMap = {
  month: 12,
  hour: 23,
  minute: 59,
  date: null,
};

const minDateMap = {
  month: 1,
  hour: 0,
  minute: 0,
  date: 1,
};

const PICKER_TYPE_MAP = {
  [YEAR]: ['year'],
  [MONTH]: ['month'],
  [DATE]: ['year', 'month', 'date'],
  [DATE_TIME]: ['year', 'month', 'date', 'hour', 'minute'],
};
const DateTimePicker = () => ({
  name: 'OmiDateTimePicker',
  mixins: [renderMixin],
  methods: {
    getDateRange(type, currentDate) {
      const date = this[type];
      const rangeMap = type === 'max' ? maxDateMap : minDateMap;
      const currentYear = currentDate.getFullYear();
      const currentMont = currentDate.getMonth();
      const year = date.getFullYear();
      let { month } = rangeMap;
      let { hour } = rangeMap;
      let { minute } = rangeMap;
      let day = rangeMap.date ? rangeMap.date : getMonthLastDate(currentYear, currentMont);
      if (currentYear === year) {
        month = date.getMonth() + 1;
        if (currentMont === month - 1) {
          day = date.getDate();
          if (currentDate.getDate() === day) {
            hour = date.getHours();
            if (currentDate.getHours() === hour) {
              minute = date.getMinutes();
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: day,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
      };
    },
    updateColums(values) {
      const { pickerType } = this;
      let index = 0;
      const date = [];
      let year;
      let month;
      while (index < pickerType.length) {
        let { value } = values[index];
        if (pickerType[index] === 'year') year = value;
        if (pickerType[index] === 'month') {
          value -= 1;
          month = value;
        }
        if (pickerType[index] === 'date') {
          const max = year && month ? getMonthLastDate(year, month) : value;
          value = value > max ? max : value;
        }

        date.push(parseInt(value, 10));
        index += 1;
      }
      this.pickerDate = this.getValidateDate(new Date(...date));
    },
  },
  computed: {
    pickerType() {
      const { type } = this;
      return PICKER_TYPE_MAP[type];
    },
    rangMap() {
      const { getDateRange, pickerDate } = this;
      const {
        maxYear,
        maxMonth,
        maxDate,
        maxHour,
        maxMinute,
      } = getDateRange('max', pickerDate);
      const {
        minYear,
        minMonth,
        minDate,
        minHour,
        minMinute,
      } = getDateRange('min', pickerDate);
      return {
        year: [maxYear, minYear],
        month: [maxMonth, minMonth],
        hour: [maxHour, minHour],
        date: [maxDate, minDate],
        minute: [maxMinute, minMinute],
      };
    },
  },
});

export default DateTimePicker();
