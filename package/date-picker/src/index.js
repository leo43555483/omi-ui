import DateTimePicker from './DateTimePicker';
import TimePicker from './TimePicker';
import pickerProps, { TIME } from './props';

const DatePicker = () => ({
  name: 'OmiDatePicker',
  props: {
    ...pickerProps,
  },
  methods: {
    // @exposed-api
    getValues() {
      return this.$refs.picker.getValues();
    },
    // @exposed-api
    setValues(values = null, columIndex) {
      return this.$refs.picker.setActiveValue(values, columIndex);
    },
  },
  render() {
    const Picker = this.type !== TIME ? DateTimePicker : TimePicker;
    const props = {
      'v-bind': this.$attrs,
      'v-on': this.$listeners,
    };
    return (
      <Picker
        ref="picker"
        type={this.type}
        {...props}
      />
    );
  },
});

export default DatePicker();
