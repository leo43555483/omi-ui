'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('../../utils/shared.js');

//
var script = {
  name: 'OmiForm',
  provide: function provide() {
    return {
      omiForm: this
    };
  },
  data: function data() {
    return {
      fields: []
    };
  },
  props: {
    labelAlign: {
      type: String,
      default: null
    },
    labelWith: {
      type: [String, Number],
      default: null
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    firstValidate: {
      type: Boolean,
      default: false
    },
    colon: {
      type: Boolean,
      default: true
    },
    scrollToError: {
      type: Boolean,
      default: false
    },
    showError: {
      type: String,
      default: ''
    },
    models: {
      type: Object
    },
    autocomplete: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onValidate: function onValidate(error, name) {
      this.$emit('validate', error, name);
    },

    /**
     * @vue2doc-exposed-api:resetValidate
     */
    resetValidate: function resetValidate() {
      this.fields.forEach(function (field) {
        return field.resetValidate();
      });
    },

    /**
     * @vue2doc-exposed-api:validateField
     */
    validateField: function validateField(name) {
      var _this$fields$filter = this.fields.filter(function (field) {
        return field.name === name;
      }),
          target = _this$fields$filter[0];

      if (target) {
        return target.validate(null);
      }

      throw new Error('please pass in valid name from item!');
    },
    scrollToView: function scrollToView(el) {
      el.scrollIntoView();
    },
    validateRace: function validateRace(callback) {
      var _this = this;

      var fields = this.fields;
      var errors = [];
      return fields.reduce(function (promise, field) {
        return promise.then(function () {
          if (!errors.length) {
            return field.validate().then(function (error) {
              if (error) {
                errors.push(error);
                if (_this.scrollToError) _this.scrollToView(field.$el);
              }
            });
          }

          return Promise.resolve();
        });
      }, Promise.resolve()).then(function () {
        var error = null;

        if (errors.length) {
          error = errors[0];
        }

        if (shared.isFunction(callback)) callback(error);
        return error;
      });
    },
    validateAll: function validateAll(callback) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var fields = _this2.fields;
        var errors = null;
        var validators = fields.map(function (field) {
          return field.validate();
        });
        Promise.all(validators).then(function (error) {
          errors = error.filter(function (item) {
            return item;
          });

          if (_this2.scrollToError) {
            var name = errors[0].name;

            var _fields$filter = fields.filter(function (field) {
              return field.name === name;
            }),
                scorllField = _fields$filter[0];

            _this2.scrollToView(scorllField.$el);
          }

          var result = errors.length ? errors : null;
          if (shared.isFunction(callback)) callback(result);
          resolve(result);
        });
      });
    },
    validate: function validate(callback) {
      var firstValidate = this.firstValidate;
      return firstValidate ? this.validateRace(callback) : this.validateAll(callback);
    }
  }
};

exports["default"] = script;
