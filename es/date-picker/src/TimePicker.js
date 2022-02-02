import renderMixin from './mixins/render.js';
import { formatDate } from './util.js';

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TimePicker = function TimePicker() {
  return {
    name: 'OmiTimePicker',
    mixins: [renderMixin],
    methods: {
      updateColums: function updateColums(values) {
        var pickerType = this.pickerType,
            pickerDate = this.pickerDate;
        var index = 0;
        var time = [];

        while (index < pickerType.length) {
          var value = values[index].value;
          time.push(parseInt(value, 10));
          index += 1;
        }

        var _formatDate = formatDate(pickerDate),
            year = _formatDate.year,
            month = _formatDate.month,
            date = _formatDate.date;

        this.pickerDate = this.getValidateDate(_construct(Date, [year, month, date].concat(time)));
      },
      getDateRange: function getDateRange(type, pickerDate) {
        var _ref;

        var date = this[type];

        var _formatDate2 = formatDate(pickerDate),
            currentHour = _formatDate2.hour;

        var hour = date.getHours();
        var minute = type === 'max' ? 59 : 0;

        if (date.getHours() === currentHour) {
          minute = date.getMinutes();
        }

        return _ref = {}, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
      }
    },
    computed: {
      pickerType: function pickerType() {
        return ['hour', 'minute'];
      },
      rangMap: function rangMap() {
        var getDateRange = this.getDateRange,
            pickerDate = this.pickerDate;

        var _getDateRange = getDateRange('max', pickerDate),
            maxHour = _getDateRange.maxHour,
            maxMinute = _getDateRange.maxMinute;

        var _getDateRange2 = getDateRange('min', pickerDate),
            minHour = _getDateRange2.minHour,
            minMinute = _getDateRange2.minMinute;

        return {
          hour: [maxHour, minHour],
          minute: [maxMinute, minMinute]
        };
      }
    }
  };
};

var TimePicker$1 = TimePicker();

export { TimePicker$1 as default };
