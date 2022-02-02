import createMixin from '../../mixins/check.js';

var Radio = function Radio() {
  return {
    name: 'OmiRadio',
    mixins: [createMixin({
      type: 'radio',
      classPrefix: 'omi-radio',
      checkParent: 'omiRadioGroup',
      unbindParent: 'indeterminate'
    })]
  };
};

var Radio$1 = Radio();

export { Radio$1 as default };
