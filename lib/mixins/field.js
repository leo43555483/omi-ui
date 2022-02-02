'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var filedMixin = {
  inject: {
    omiFormItem: {
      default: null
    }
  },
  methods: {
    validateTriggerOn: function validateTriggerOn(trigger) {
      if (this.omiFormItem) {
        this.omiFormItem.validate(trigger);
      }
    }
  }
};

exports["default"] = filedMixin;
