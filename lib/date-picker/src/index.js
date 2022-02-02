'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _mergeJSXProps = require('@vue/babel-helper-vue-jsx-merge-props');
var DateTimePicker = require('./DateTimePicker.js');
var TimePicker = require('./TimePicker.js');
var props = require('./props.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _mergeJSXProps__default = /*#__PURE__*/_interopDefaultLegacy(_mergeJSXProps);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DatePicker = function DatePicker() {
  return {
    name: 'OmiDatePicker',
    inheritAttrs: false,
    props: _extends({}, props["default"]),
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
      var Picker = this.type !== props.TIME ? DateTimePicker["default"] : TimePicker["default"];
      var props$1 = {
        props: this.$props,
        attrs: this.$attrs,
        on: this.$listeners
      };
      return h(Picker, _mergeJSXProps__default["default"]([{
        "ref": "picker"
      }, props$1]));
    }
  };
};

var DatePicker$1 = DatePicker();

exports["default"] = DatePicker$1;
