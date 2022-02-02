import createMixin from '../../mixins/check.js';

var CheckBox = function CheckBox() {
  return {
    name: 'OmiCheckbox',
    mixins: [createMixin({
      type: 'checkbox',
      classPrefix: 'omi-checkbox',
      checkParent: 'omiCheckGroup',
      unbindParent: 'indeterminate'
    })],
    props: {
      indeterminate: {
        type: Boolean,
        default: false
      }
    }
  };
};

var CheckBox$1 = CheckBox();

export { CheckBox$1 as default };
