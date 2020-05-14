import Picker from '../../../picker';
import pickerProps from '../props';
import { getMonthLastDate, formatDate, getDate } from '../util';
import { getRange, unDef } from '../../../../src/utils/shared';

const maxDateMap = {
  month: 12,
  hour: 23,
  minute: 59,
};

const minDateMap = {
  month: 1,
  hour: 1,
  minute: 0,
  date: 1,
};
const pcikerRender = () => ({
  data() {
    return {
      pickerDate: this.getValidateDate(this.currentDate),
    };
  },
  props: {
    ...pickerProps,
  },
  watch: {
    currentDate(date) {
      this.pickerDate = this.getValidateDate(date);
    },
    pickerDate() {
      this.setActiveValue();
    },
  },
  methods: {
    getValues() {
      return this.$refs.datePicker.getValues();
    },
    setActiveValue(originValues = null, columIndex) {
      this.$nextTick(() => {
        this.$nextTick(() => {
          let values = originValues;
          if (unDef(originValues)) {
            const { pickerDate, pickerType } = this;
            const date = formatDate(pickerDate);
            values = pickerType.map((type) => {
              let value = `${date[type]}`;
              value = value < 10 ? `0${value}` : value;
              return value;
            });
          }
          this.$refs.datePicker.setValues(values, columIndex);
        });
      });
    },
    onChange(values, columIndex) {
      if (this.updateColums) this.updateColums(values);
      this.$nextTick(() => {
        this.$emit('change', values, columIndex);
      });
    },
    getValidateDate(date) {
      const { min, max } = this;
      return new Date(getRange(date, max, min));
    },
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
          if (currentDate.getDate === day) {
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
  },
  computed: {
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
    colums() {
      const { pickerType, rangMap } = this;
      return pickerType.map((type) => {
        let values = getDate(rangMap[type]);
        values = this.filter(type, values);
        values = values.map((date) => {
          const label = this.formatter(type, date);
          return {
            label,
            value: date,
            key: date,
          };
        });
        return values;
      });
    },
  },
  mounted() {
    this.setActiveValue();
  },
  render() {
    const props = {
      'v-bind': this.$attrs,
    };
    return (
      <Picker
        ref="datePicker"
        onChange={this.onChange}
        data={this.colums}
        {...props}
      />
    );
  },
});

export default pcikerRender();
