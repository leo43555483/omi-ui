import Picker from '../../../picker';
import pickerProps, { MONTH, YEAR, TIME } from '../props';
import { formatDate, getDate } from '../util';
import { getRange, unDef, isFunction } from '../../../../src/utils/shared';

const pcikerRender = () => ({
  inheritAttrs: false,
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
    getPicker() {
      return this.$refs.datePicker;
    },
    getValues() {
      return this.$refs.datePicker.getValues();
    },
    setActiveValue(originValues = null, columIndex) {
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
      // this.$nextTick(() => {
      //   this.$nextTick(() => {});
      // });
    },
    onChange(values, columIndex) {
      if (this.needUpdate) this.updateColums(values);
      this.$nextTick(() => {
        this.$emit('change', values, columIndex);
      });
    },
    getValidateDate(date) {
      const { type, min, max } = this;
      if (type === TIME) {
        const {
          year, month, date: currentDate, hour: currentHour, minute: currentMinute,
        } = formatDate(date);
        const { hour: maxHour, minute: maxMinute } = formatDate(max);
        const { hour: minHour, minute: minMinute } = formatDate(min);
        const hour = getRange(currentHour, maxHour, minHour);
        let minute = currentMinute;
        if (currentHour === maxHour) {
          minute = currentMinute > maxMinute ? maxMinute : currentMinute;
        }
        if (currentHour === minHour) {
          minute = currentMinute < minMinute ? minMinute : currentMinute;
        }

        return new Date(year, month, currentDate, hour, minute);
      }
      return new Date(getRange(date, max, min));
    },
  },
  computed: {
    needUpdate() {
      const { updateColums, type } = this;
      return isFunction(updateColums) && type !== MONTH && type !== YEAR;
    },
    colums() {
      const { pickerType, rangMap } = this;
      return pickerType.map((type) => {
        let values = getDate(rangMap[type]);
        const filter = this.filter(type, values);
        values = filter || values;
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
    listeners() {
      const { onChange } = this;
      return {
        ...this.$listeners,
        change: onChange,
      };
    },
  },
  mounted() {
    this.setActiveValue();
  },
  render() {
    const props = {
      props: this.$attrs,
      on: this.listeners,
    };
    return <Picker ref="datePicker" data={this.colums} {...props} />;
  },
});

export default pcikerRender();
