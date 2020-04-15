
import createCheckMixin from '../../mixins/check';

const CheckBox = () => ({
  name: 'OmiRadio',
  mixins: [createCheckMixin({
    type: 'radio',
    classPrefix: 'omi-radio',
    checkParent: 'omiRadioGroup',
    unbindParent: 'indeterminate',
  })],
});

export default CheckBox();
