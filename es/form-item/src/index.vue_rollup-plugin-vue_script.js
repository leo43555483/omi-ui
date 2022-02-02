import AsyncValidator from 'async-validator';
import { getValueByName } from '../../utils/shared.js';
import '../../cell/index.js';
import Cell from '../../cell/src/index.vue.js';

var _components;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var STATUS_VALIDATING = 'validating';
var STATUS_FAILED = 'failed';
var STATUS_SUCCESS = 'success';
var script = {
  name: 'OmiFormItem',
  inheritAttrs: false,
  provide: function provide() {
    return {
      omiFormItem: this
    };
  },
  inject: {
    omiForm: {
      default: null
    }
  },
  data: function data() {
    return {
      status: '',
      validateMessage: ''
    };
  },
  props: {
    labelWith: {
      type: [String, Number],
      default: null
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    showRequired: {
      type: Boolean,
      default: true
    },
    labelFor: {
      type: String,
      default: null
    },
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    colon: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  components: (_components = {}, _components[Cell.name] = Cell, _components),
  methods: {
    validate: function validate(trigger, callback) {
      var _model,
          _this = this;

      if (callback === void 0) {
        callback = function callback() {};
      }

      var rules = this.getRulesByTrigger(trigger);

      if (rules.length === 0) {
        return Promise.resolve().then(function () {
          return callback();
        });
      }

      rules.forEach(function (item) {
        var t = item;
        delete t.trigger;
      });
      var name = this.name,
          filedValue = this.filedValue;
      var descriptor = {};
      descriptor[name] = rules;
      var model = (_model = {}, _model[name] = filedValue, _model);
      var validator = new AsyncValidator(descriptor);
      var option = {
        firstFields: true
      };
      this.setValidateStatus(STATUS_VALIDATING);
      return validator.validate(model, option).then(function () {
        _this.setValidateStatus(STATUS_SUCCESS);

        _this.validateMessage = '';

        _this.omiForm.onValidate(null, name);

        callback();
      }).catch(function (_ref) {
        var errors = _ref.errors,
            fields = _ref.fields;

        _this.setValidateStatus(STATUS_FAILED);

        var message = errors[0].message;
        _this.validateMessage = message;
        var ret = {
          name: name,
          message: message,
          fields: fields
        };

        _this.omiForm.onValidate(errors, name);

        callback(ret);
        return ret;
      });
    },
    resetValidate: function resetValidate() {
      this.status = '';
      this.validateMessage = '';
    },
    getRulesByTrigger: function getRulesByTrigger(originTrigger) {
      var rules = this.rules;

      if (!originTrigger) {
        return rules.map(function (rule) {
          return _extends({}, rule);
        });
      }

      var re = new RegExp("^" + originTrigger + "$");
      return rules.filter(function (_ref2) {
        var trigger = _ref2.trigger;
        return !trigger || re.test(trigger);
      }).map(function (item) {
        return _extends({}, item);
      });
    },
    setValidateStatus: function setValidateStatus(status) {
      this.status = status;
    }
  },
  computed: {
    filedValue: function filedValue() {
      var name = this.name;
      if (!name || !this.omiForm) return '';
      var models = this.omiForm.models;
      return getValueByName(models, name);
    },
    isRequired: function isRequired() {
      return this.rules.some(function (rule) {
        return rule.required;
      });
    },
    titleStyle: function titleStyle() {
      var omiForm = this.omiForm;
      var labelWith = omiForm && omiForm.labelWith || this.labelWith;
      var labelAlign = omiForm && omiForm.labelAlign || this.labelAlign;
      return "width: " + labelWith + "px; text-align: " + labelAlign;
    },
    titleClass: function titleClass() {
      var classes = 'omi-form-item__title';

      if (this.isRequired && this.showRequired) {
        classes += ' omi-form-title__required';
      }

      return classes;
    }
  },
  created: function created() {
    if (this.omiForm) this.omiForm.fields.push(this);
  }
};

export { script as default };
