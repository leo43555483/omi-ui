'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../../utils/shared.js');

var DATE = 'date';
var YEAR = 'year';
var MONTH = 'month';
var TIME = 'time';
var DATE_TIME = 'datetime';
var DEFAULT_TYPE = DATE;
var DEFAULT_CURRENT_DATE = new Date();
var MAX_YEAR = DEFAULT_CURRENT_DATE.getFullYear() + 10;
var MIN_YEAR = DEFAULT_CURRENT_DATE.getFullYear() - 10;
var pickerProps = {
  type: {
    type: String,
    default: DEFAULT_TYPE,
    validator: function validator(value) {
      return shared.oneOf(value, [DATE, YEAR, MONTH, TIME, DATE_TIME]);
    }
  },
  currentDate: {
    type: Date,
    default: function _default() {
      return DEFAULT_CURRENT_DATE;
    },
    validator: function validator(value) {
      return shared.isDate(value);
    }
  },
  max: {
    type: Date,
    default: function _default() {
      return new Date(MAX_YEAR, 11, 31, 23, 59);
    },
    validator: function validator(value) {
      return shared.isDate(value);
    }
  },
  min: {
    type: Date,
    default: function _default() {
      return new Date(MIN_YEAR, 0, 1, 0, 0);
    },
    validator: function validator(value) {
      return shared.isDate(value);
    }
  },
  filter: {
    type: Function,
    default: function _default(type, values) {
      return values;
    }
  },
  formatter: {
    type: Function,
    default: function _default(type, values) {
      return values;
    }
  }
};

exports.DATE = DATE;
exports.DATE_TIME = DATE_TIME;
exports.MONTH = MONTH;
exports.TIME = TIME;
exports.YEAR = YEAR;
exports["default"] = pickerProps;
