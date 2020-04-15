<template>
  <div class="omi-form-item" :class="{'omi-form-item__error': validateMessage}">
    <omi-cell :title-class="titleClass" :title-style="titleStyle" v-bind="$attrs">
      <template slot="icon-left">
        <slot name="icon-left"></slot>
      </template>
      <template slot="title">
        <slot name="label">
          <label v-if="label" :for="labelFor">{{label}}<span v-if="colon">:</span>
          </label>
        </slot>
      </template>
      <template slot="content">
        <slot></slot>
      </template>
      <template slot="extra">
        <slot name="extra"></slot>
      </template>
      <template slot="icon-right">
        <slot name="icon-right"></slot>
      </template>
      <template v-if="name" slot="description">
          <transition name="fade-to-bottom">
            <div
              v-if="validateMessage"
              class="omi-form-item__message"
            >{{validateMessage}}</div>
          </transition>
      </template>
    </omi-cell>

  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import { getValueByName } from '../../../src/utils/shared';

const STATUS_VALIDATING = 'validating';
const STATUS_FAILED = 'failed';
const STATUS_SUCCESS = 'success';
export default {
  name: 'OmiFormItem',
  inheritAttrs: false,
  provide() {
    return {
      omiFormItem: this,
    };
  },
  inject: {
    omiForm: {
      default: null,
    },
  },
  data() {
    return {
      status: '',
      validateMessage: '',
    };
  },
  props: {
    labelWith: {
      type: [String, Number],
      default: null,
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
    showRequired: {
      type: Boolean,
      default: true,
    },
    labelFor: {
      type: String,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    colon: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    validate(trigger, callback = () => {}) {
      const rules = this.getRulesByTrigger(trigger);
      if (rules.length === 0) {
        return Promise.resolve().then(() => callback());
      }
      rules.forEach((item) => {
        const t = item;
        delete t.trigger;
      });
      const { name, filedValue } = this;
      const descriptor = {};
      descriptor[name] = rules;
      const model = {
        [name]: filedValue,
      };
      const validator = new AsyncValidator(descriptor);
      const option = { firstFields: true };
      this.setValidateStatus(STATUS_VALIDATING);
      return validator.validate(model, option).then(() => {
        this.setValidateStatus(STATUS_SUCCESS);
        this.validateMessage = '';
        this.omiForm.onValidate(null, name);
        callback();
      }).catch(({ errors, fields }) => {
        this.setValidateStatus(STATUS_FAILED);
        const { message } = errors[0];
        this.validateMessage = message;
        const ret = {
          name,
          message,
          fields,
        };
        this.omiForm.onValidate(errors, name);
        callback(ret);
        return ret;
      });
    },
    resetValidate() {
      this.status = '';
      this.validateMessage = '';
    },
    getRulesByTrigger(originTrigger) {
      const { rules } = this;
      if (!originTrigger) {
        return rules.map((rule) => ({ ...rule }));
      }
      const re = new RegExp(`^${originTrigger}$`);
      return rules
        .filter(({ trigger }) => !trigger || re.test(trigger))
        .map((item) => ({ ...item }));
    },
    setValidateStatus(status) {
      this.status = status;
    },
  },
  computed: {
    filedValue() {
      const { name } = this;
      if (!name || !this.omiForm) return '';
      const { model } = this.omiForm;
      return getValueByName(model, name);
    },
    isRequired() {
      return this.rules.some((rule) => rule.required);
    },
    titleStyle() {
      const { omiForm } = this;
      const labelWith = (omiForm && omiForm.labelWith) || this.labelWith;
      const labelAlign = (omiForm && omiForm.labelAlign) || this.labelAlign;
      return `width: ${labelWith}px; text-align: ${labelAlign}`;
    },
    titleClass() {
      let classes = 'omi-form-item__title';
      if (this.isRequired && this.showRequired) {
        classes += ' omi-form-title__required';
      }
      return classes;
    },
  },
  created() {
    if (this.omiForm) this.omiForm.fields.push(this);
  },
};
</script>

<style>

</style>
