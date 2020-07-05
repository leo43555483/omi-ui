<template>
  <div class="omi-input">
    <input
      ref="input"
      class="omi-input__inner"
      :type="type"
      v-on="listeners"
      v-bind="$attrs"
      :value="value"
    />
  </div>
</template>

<script>
import { oneOf } from '../../../src/utils/shared';
import filedMixin from '../../mixins/field';
import inputMixin from '../../mixins/input';

const INPUT_TYPE = [
  'text',
  'password',
  'url',
  'email',
  'date',
  'number',
  'tel',
  'search',
];
export default {
  name: 'OmiInput',
  mixins: [filedMixin, inputMixin],
  inheritAttrs: false,
  data() {
    return {
      isComposing: false,
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
  watch: {
    value() {
      this.validateTriggerOn('change');
    },
  },
  props: {
    type: {
      validator(value) {
        return oneOf(value, INPUT_TYPE);
      },
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>
