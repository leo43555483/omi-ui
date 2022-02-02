import { oneOf } from '../../utils/shared.js';
import filedMixin from '../../mixins/field.js';
import inpuMixin from '../../mixins/input.js';

//
var INPUT_TYPE = ['text', 'password', 'url', 'email', 'date', 'number', 'tel', 'search'];
var script = {
  name: 'OmiInput',
  mixins: [filedMixin, inpuMixin],
  inheritAttrs: false,
  data: function data() {
    return {
      isComposing: false
    };
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    }
  },
  watch: {
    value: function value() {
      this.validateTriggerOn('change');
    }
  },
  props: {
    type: {
      validator: function validator(value) {
        return oneOf(value, INPUT_TYPE);
      },
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
};

export { script as default };
