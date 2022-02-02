import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';
import DateTimePicker from './DateTimePicker.js';
import TimePicker from './TimePicker.js';
import pickerProps, { TIME } from './props.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DatePicker = function DatePicker() {
  return {
    name: 'OmiDatePicker',
    inheritAttrs: false,
    props: _extends({}, pickerProps),
    methods: {
      /**
       * @vue2doc-exposed-api:getValues
       * @return {Array} values
      */
      getValues: function getValues() {
        return this.$refs.picker.getPicker().getValues();
      },

      /**
       * @vue2doc-exposed-api:setValues
       * @return {Array} values
      */
      setValues: function setValues(values, columIndex) {
        if (values === void 0) {
          values = null;
        }

        return this.$refs.picker.setActiveValue(values, columIndex);
      },

      /**
       * @vue2doc-exposed-api:isScrolling
       * @return {Boolean} values
      */
      isScrolling: function isScrolling() {
        return this.$refs.picker.getPicker().isScrolling();
      }
    },
    render: function render() {
      var h = arguments[0];
      var Picker = this.type !== TIME ? DateTimePicker : TimePicker;
      var props = {
        props: this.$props,
        attrs: this.$attrs,
        on: this.$listeners
      };
      return h(Picker, _mergeJSXProps([{
        "ref": "picker"
      }, props]));
    }
  };
};

var DatePicker$1 = DatePicker();

export { DatePicker$1 as default };
