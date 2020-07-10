import createCheckMixin from '../../mixins/check';

const CheckBox = () => ({
  name: 'OmiCheckbox',
  mixins: [
    createCheckMixin({
      type: 'checkbox',
      classPrefix: 'omi-checkbox',
      checkParent: 'omiCheckGroup',
      unbindParent: 'indeterminate',
    }),
  ],
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
});

export default CheckBox();
