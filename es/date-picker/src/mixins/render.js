import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';
import '../../../picker/index.js';
import pickerProps, { TIME, MONTH, YEAR } from '../props.js';
import { formatDate, getDate } from '../util.js';
import { unDef, getRange, isFunction } from '../../../utils/shared.js';
import Picker from '../../../picker/src/index.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var pcikerRender = function pcikerRender() {
  return {
    inheritAttrs: false,
    data: function data() {
      return {
        pickerDate: this.getValidateDate(this.currentDate)
      };
    },
    props: _extends({}, pickerProps),
    watch: {
      currentDate: function currentDate(date) {
        this.pickerDate = this.getValidateDate(date);
      },
      pickerDate: function pickerDate() {
        this.setActiveValue();
      }
    },
    methods: {
      getPicker: function getPicker() {
        return this.$refs.datePicker;
      },
      getValues: function getValues() {
        return this.$refs.datePicker.getValues();
      },
      setActiveValue: function setActiveValue(originValues, columIndex) {
        if (originValues === void 0) {
          originValues = null;
        }

        var values = originValues;

        if (unDef(originValues)) {
          var pickerDate = this.pickerDate,
              pickerType = this.pickerType;
          var date = formatDate(pickerDate);
          values = pickerType.map(function (type) {
            var value = "" + date[type];
            value = value < 10 ? "0" + value : value;
            return value;
          });
        }

        this.$refs.datePicker.setValues(values, columIndex); // this.$nextTick(() => {
        //   this.$nextTick(() => {});
        // });
      },
      onChange: function onChange(values, columIndex) {
        var _this = this;

        if (this.needUpdate) this.updateColums(values);
        this.$nextTick(function () {
          _this.$emit('change', values, columIndex);
        });
      },
      getValidateDate: function getValidateDate(date) {
        var type = this.type,
            min = this.min,
            max = this.max;

        if (type === TIME) {
          var _formatDate = formatDate(date),
              year = _formatDate.year,
              month = _formatDate.month,
              currentDate = _formatDate.date,
              currentHour = _formatDate.hour,
              currentMinute = _formatDate.minute;

          var _formatDate2 = formatDate(max),
              maxHour = _formatDate2.hour,
              maxMinute = _formatDate2.minute;

          var _formatDate3 = formatDate(min),
              minHour = _formatDate3.hour,
              minMinute = _formatDate3.minute;

          var hour = getRange(currentHour, maxHour, minHour);
          var minute = currentMinute;

          if (currentHour === maxHour) {
            minute = currentMinute > maxMinute ? maxMinute : currentMinute;
          }

          if (currentHour === minHour) {
            minute = currentMinute < minMinute ? minMinute : currentMinute;
          }

          return new Date(year, month, currentDate, hour, minute);
        }

        return new Date(getRange(date, max, min));
      }
    },
    computed: {
      needUpdate: function needUpdate() {
        var updateColums = this.updateColums,
            type = this.type;
        return isFunction(updateColums) && type !== MONTH && type !== YEAR;
      },
      colums: function colums() {
        var _this2 = this;

        var pickerType = this.pickerType,
            rangMap = this.rangMap;
        return pickerType.map(function (type) {
          var values = getDate(rangMap[type]);

          var filter = _this2.filter(type, values);

          values = filter || values;
          values = values.map(function (date) {
            var label = _this2.formatter(type, date);

            return {
              label: label,
              value: date,
              key: date
            };
          });
          return values;
        });
      },
      listeners: function listeners() {
        var onChange = this.onChange;
        return _extends({}, this.$listeners, {
          change: onChange
        });
      }
    },
    mounted: function mounted() {
      this.setActiveValue();
    },
    render: function render() {
      var h = arguments[0];
      var props = {
        props: this.$attrs,
        on: this.listeners
      };
      return h(Picker, _mergeJSXProps([{
        "ref": "datePicker",
        "attrs": {
          "data": this.colums
        }
      }, props]));
    }
  };
};

var renderMixin = pcikerRender();

export { renderMixin as default };
