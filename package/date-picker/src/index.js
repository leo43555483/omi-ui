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
    /**
     * @vue2doc-exposed-api:getValues
     * @return {Array} values
    */
    getValues() {
      return this.$refs.picker.getPicker().getValues();
    },
    /**
     * @vue2doc-exposed-api:setValues
     * @return {Array} values
    */
    setValues(values = null, columIndex) {
      return this.$refs.picker.setActiveValue(values, columIndex);
    },
    /**
     * @vue2doc-exposed-api:isScrolling
     * @return {Boolean} values
    */
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
