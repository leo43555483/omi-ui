'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var render = require('./mixins/render.js');
var util = require('./util.js');
var props = require('./props.js');

var _PICKER_TYPE_MAP;

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var maxDateMap = {
  month: 12,
  hour: 23,
  minute: 59,
  date: null
};
var minDateMap = {
  month: 1,
  hour: 0,
  minute: 0,
  date: 1
};
var PICKER_TYPE_MAP = (_PICKER_TYPE_MAP = {}, _PICKER_TYPE_MAP[props.YEAR] = ['year'], _PICKER_TYPE_MAP[props.MONTH] = ['month'], _PICKER_TYPE_MAP[props.DATE] = ['year', 'month', 'date'], _PICKER_TYPE_MAP[props.DATE_TIME] = ['year', 'month', 'date', 'hour', 'minute'], _PICKER_TYPE_MAP);

var DateTimePicker = function DateTimePicker() {
  return {
    name: 'OmiDateTimePicker',
    mixins: [render["default"]],
    methods: {
      getDateRange: function getDateRange(type, currentDate) {
        var _ref;

        var date = this[type];
        var rangeMap = type === 'max' ? maxDateMap : minDateMap;
        var currentYear = currentDate.getFullYear();
        var currentMont = currentDate.getMonth();
        var year = date.getFullYear();
        var month = rangeMap.month;
        var hour = rangeMap.hour;
        var minute = rangeMap.minute;
        var day = rangeMap.date ? rangeMap.date : util.getMonthLastDate(currentYear, currentMont);

        if (currentYear === year) {
          month = date.getMonth() + 1;

          if (currentMont === month - 1) {
            day = date.getDate();

            if (currentDate.getDate() === day) {
              hour = date.getHours();

              if (currentDate.getHours() === hour) {
                minute = date.getMinutes();
              }
            }
          }
        }

        return _ref = {}, _ref[type + "Year"] = year, _ref[type + "Month"] = month, _ref[type + "Date"] = day, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
      },
      updateColums: function updateColums(values) {
        var pickerType = this.pickerType;
        var index = 0;
        var date = [];
        var year;
        var month;

        while (index < pickerType.length) {
          var value = values[index].value;
          if (pickerType[index] === 'year') year = value;

          if (pickerType[index] === 'month') {
            value -= 1;
            month = value;
          }

          if (pickerType[index] === 'date') {
            var max = year && month ? util.getMonthLastDate(year, month) : value;
            value = value > max ? max : value;
          }

          date.push(parseInt(value, 10));
          index += 1;
        }

        this.pickerDate = this.getValidateDate(_construct(Date, date));
      }
    },
    computed: {
      pickerType: function pickerType() {
        var type = this.type;
        return PICKER_TYPE_MAP[type];
      },
      rangMap: function rangMap() {
        var getDateRange = this.getDateRange,
            pickerDate = this.pickerDate;

        var _getDateRange = getDateRange('max', pickerDate),
            maxYear = _getDateRange.maxYear,
            maxMonth = _getDateRange.maxMonth,
            maxDate = _getDateRange.maxDate,
            maxHour = _getDateRange.maxHour,
            maxMinute = _getDateRange.maxMinute;

        var _getDateRange2 = getDateRange('min', pickerDate),
            minYear = _getDateRange2.minYear,
            minMonth = _getDateRange2.minMonth,
            minDate = _getDateRange2.minDate,
            minHour = _getDateRange2.minHour,
            minMinute = _getDateRange2.minMinute;

        return {
          year: [maxYear, minYear],
          month: [maxMonth, minMonth],
          hour: [maxHour, minHour],
          date: [maxDate, minDate],
          minute: [maxMinute, minMinute]
        };
      }
    }
  };
};

var DateTimePicker$1 = DateTimePicker();

exports["default"] = DateTimePicker$1;
