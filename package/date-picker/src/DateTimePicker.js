import renderMixin from './mixins/render';
import { getMonthLastDate } from './util';

import {
  DATE,
  YEAR,
  MONTH,
  DATE_TIME,
} from './props';

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
          const max = year && month ? getMonthLastDate(year, month - 1) : value;
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
  },
});

export default DateTimePicker();
