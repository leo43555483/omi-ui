import renderMixin from './mixins/render';
import { formatDate } from './util';

const TimePicker = () => ({
  name: 'OmiTimePicker',
  mixins: [renderMixin],
  methods: {
    updateColums(values) {
      const { pickerType, pickerDate } = this;
      let index = 0;
      const time = [];
      while (index < pickerType.length) {
        const { value } = values[index];
        time.push(parseInt(value, 10));
        index += 1;
      }
      const { year, month, date } = formatDate(pickerDate);
      this.pickerDate = this.getValidateDate(new Date(year, month, date, ...time));
    },
    getDateRange(type, pickerDate) {
      const date = this[type];
      const { hour: currentHour } = formatDate(pickerDate);
      const hour = date.getHours();
      let minute = type === 'max' ? 59 : 0;
      if (date.getHours() === currentHour) {
        minute = date.getMinutes();
      }
      return {
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
      };
    },
  },
  computed: {
    pickerType() {
      return ['hour', 'minute'];
    },
    rangMap() {
      const { getDateRange, pickerDate } = this;
      const {
        maxHour,
        maxMinute,
      } = getDateRange('max', pickerDate);
      const {

        minHour,
        minMinute,
      } = getDateRange('min', pickerDate);
      return {
        hour: [maxHour, minHour],
        minute: [maxMinute, minMinute],
      };
    },
  },
});

export default TimePicker();
