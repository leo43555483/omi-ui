import DateTimePicker from './DateTimePicker';
import TimePicker from './TimePicker';
import pickerProps, { TIME } from './props';

const DatePicker = () => ({
  name: 'OmiDatePicker',
  inheritAttrs: false,
  props: {
    ...pickerProps,
  },
  methods: {
    // @exposed-api
    getValues() {
      return this.$refs.picker.getPicker().getValues();
    },
    // @exposed-api
    setValues(values = null, columIndex) {
      return this.$refs.picker.setActiveValue(values, columIndex);
    },
    // @exposed-api
    isScrolling() {
      return this.$refs.picker.getPicker().isScrolling();
    },
  },
  render() {
    const Picker = this.type !== TIME ? DateTimePicker : TimePicker;
    const props = {
      props: this.$props,
      attrs: this.$attrs,
      on: this.$listeners,
    };
    return (
      <Picker
        ref="picker"
        {...props}
      />
    );
  },
});

export default DatePicker();
