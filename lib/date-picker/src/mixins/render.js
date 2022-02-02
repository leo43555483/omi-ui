'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _mergeJSXProps = require('@vue/babel-helper-vue-jsx-merge-props');
require('../../../picker/index.js');
var props = require('../props.js');
var util = require('../util.js');
var shared = require('../../../utils/shared.js');
var index = require('../../../picker/src/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var pcikerRender = function pcikerRender() {
  return {
    inheritAttrs: false,
    data: function data() {
      return {
        pickerDate: this.getValidateDate(this.currentDate)
      };
    },
    props: _extends({}, props["default"]),
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

        if (shared.unDef(originValues)) {
          var pickerDate = this.pickerDate,
              pickerType = this.pickerType;
          var date = util.formatDate(pickerDate);
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

        if (type === props.TIME) {
          var _formatDate = util.formatDate(date),
              year = _formatDate.year,
              month = _formatDate.month,
              currentDate = _formatDate.date,
              currentHour = _formatDate.hour,
              currentMinute = _formatDate.minute;

          var _formatDate2 = util.formatDate(max),
              maxHour = _formatDate2.hour,
              maxMinute = _formatDate2.minute;

          var _formatDate3 = util.formatDate(min),
              minHour = _formatDate3.hour,
              minMinute = _formatDate3.minute;

          var hour = shared.getRange(currentHour, maxHour, minHour);
          var minute = currentMinute;

          if (currentHour === maxHour) {
            minute = currentMinute > maxMinute ? maxMinute : currentMinute;
          }

          if (currentHour === minHour) {
            minute = currentMinute < minMinute ? minMinute : currentMinute;
          }

          return new Date(year, month, currentDate, hour, minute);
        }

        return new Date(shared.getRange(date, max, min));
      }
    },
    computed: {
      needUpdate: function needUpdate() {
        var updateColums = this.updateColums,
            type = this.type;
        return shared.isFunction(updateColums) && type !== props.MONTH && type !== props.YEAR;
      },
      colums: function colums() {
        var _this2 = this;

        var pickerType = this.pickerType,
            rangMap = this.rangMap;
        return pickerType.map(function (type) {
          var values = util.getDate(rangMap[type]);

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
      return h(index["default"], _mergeJSXProps__default["default"]([{
        "ref": "datePicker",
        "attrs": {
          "data": this.colums
        }
      }, props]));
    }
  };
};

var renderMixin = pcikerRender();

exports["default"] = renderMixin;
