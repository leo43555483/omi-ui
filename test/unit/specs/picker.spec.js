import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Picker from '@/picker';
import { fromArray, wait } from '../utils/shared';

chai.use(sinonChai);
const createPicker = (props = {}, opt = {}) => {
  const data = [[
    { label: 'test1', value: '1' },
    { label: 'test2', value: '2' },
  ]];
  return mount(Picker, {
    propsData: { data, ...props },
    ...opt,
  });
};
describe('Picker', () => {
  it('title', () => {
    const title = 'address picker';
    const wrapper = createPicker({ title });
    expect(wrapper.find('.omi-picker__title').text()).to.equal(title);
  });

  it('confirmText', () => {
    const confirmText = 'confirm';
    const wrapper = createPicker({ confirmText });
    expect(wrapper.find('.omi-picker__confirm').text()).to.equal(confirmText);
  });

  it('cancelText', () => {
    const cancelText = 'cancel';
    const wrapper = createPicker({ cancelText });
    expect(wrapper.find('.omi-picker__cancel').text()).to.equal(cancelText);
  });

  it('itemHeight', () => {
    const itemHeight = 60;
    const wrapper = createPicker({ itemHeight });
    const rows = wrapper.findAll('.omi-picker-colum__list--item');
    fromArray(rows).forEach((item) => {
      expect(item.attributes('style')).to.include(`height: ${itemHeight}px;`);
    });
  });

  it('duration', async () => {
    const duration = 900;
    const wrapper = createPicker({ duration });

    await wrapper.vm.$nextTick();
    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');
    await wrapper.vm.$nextTick();

    expect(colum.attributes('style')).to.include(`transition-duration: ${duration}ms`);
  });

  it('labelKey and valueKey', async () => {
    const labelKey = 'key';
    const valueKey = 'content';
    const data = [
      [
        {
          [labelKey]: 'test1',
          [valueKey]: 1,
        },
        {
          [labelKey]: 'test2',
          [valueKey]: 2,
        },
        {
          [labelKey]: 'test3',
          [valueKey]: 3,
        },
      ],
    ];
    const wrapper = createPicker({ data, labelKey, valueKey });

    await wrapper.vm.$nextTick();
    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');
    await wrapper.vm.$nextTick();

    colum.trigger('transitionend');
    await wrapper.vm.$nextTick();

    expect(item.classes()).to.include('omi-picker-colum__list--active');
    expect(item.text()).to.equal('test2');
    expect(wrapper.vm.isScrolling()).to.false;

    const [result] = wrapper.vm.getValues();
    expect(result.value).to.equal(2);
  });

  it('handle confirm', async () => {
    const onConfirm = sinon.spy();

    const confirmText = 'confirm';
    const wrapper = createPicker({ onConfirm, confirmText });

    await wrapper.vm.$nextTick();
    const button = wrapper.find('.omi-picker__confirm');
    button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(onConfirm).to.be.calledOnce;
  });

  it('handle cancel', async () => {
    const onCancel = sinon.spy();

    const cancelText = 'cancel';
    const wrapper = createPicker({ onCancel, cancelText });

    await wrapper.vm.$nextTick();
    const button = wrapper.find('.omi-picker__cancel');
    button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(onCancel).to.be.calledOnce;
  });

  it('trigger change event', async () => {
    const onChange = sinon.spy();

    const data = [
      [
        { label: '珠海', value: 'zhuhai' },
        { label: '潮州', value: 'chaozhou' },
      ],
      [
        { label: '东莞', value: 'dongguan' },
        { label: '汕尾', value: 'shanwei' },
      ],
      [
        { label: '揭阳', value: 'jieyang' },
        { label: '肇庆', value: 'zhaoqing' },
      ],
    ];

    const wrapper = createPicker({ data }, {
      listeners: {
        change: onChange,
      },
    });

    await wrapper.vm.$nextTick();
    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');
    await wrapper.vm.$nextTick();

    colum.trigger('transitionend');
    await wrapper.vm.$nextTick();

    expect(item.classes()).to.include('omi-picker-colum__list--active');
    expect(onChange).to.be.calledOnce;
    const [values] = wrapper.emitted('change');
    expect(values[0][0].value).to.equal('chaozhou');
  });

  it('setValues', async () => {
    const data = [
      [
        { label: '珠海', value: 'zhuhai' },
        { label: '潮州', value: 'chaozhou' },
      ],
      [
        { label: '东莞', value: 'dongguan' },
        { label: '汕尾', value: 'shanwei' },
      ],
      [
        { label: '揭阳', value: 'jieyang' },
        { label: '肇庆', value: 'zhaoqing' },
      ],
    ];
    const activeValues = ['chaozhou', 'shanwei', 'zhaoqing'];
    const wrapper = createPicker({ data });

    await wrapper.vm.$nextTick();
    wrapper.vm.setValues(activeValues);

    await wait();
    let result = wrapper.vm.getValues().map((colum) => colum.value);
    expect(result).to.deep.equal(activeValues);
    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');
    await wrapper.vm.$nextTick();

    colum.trigger('transitionend');
    await wrapper.vm.$nextTick();

    wrapper.vm.setValues('dongguan', 1);
    await wrapper.vm.$nextTick();

    result = wrapper.vm.getValues();
    expect(result[1].value).to.equal('dongguan');
  });

  it('updateColum', async () => {
    const data = [
      [
        { label: '珠海', value: 'zhuhai' },
        { label: '潮州', value: 'chaozhou' },
      ],
      [
        { label: '东莞', value: 'dongguan' },
        { label: '汕尾', value: 'shanwei' },
      ],
      [
        { label: '揭阳', value: 'jieyang' },
        { label: '肇庆', value: 'zhaoqing' },
      ],
    ];

    const colum2fresh = [
      { label: '广州', value: 'guangzhou' },
      { label: '惠州', value: 'huizhou' },
    ];
    const colum3fresh = [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
    ];
    const wrapper = createPicker({ data });

    await wrapper.vm.$nextTick();
    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');
    await wrapper.vm.$nextTick();

    colum.trigger('transitionend');
    await wrapper.vm.$nextTick();

    wrapper.vm.updateColum(colum2fresh, 1);
    wrapper.vm.updateColum(colum3fresh, 2);


    const assert = (columIndex, origin) => {
      const options = wrapper
        .findAll('.omi-picker-colum__list')
        .at(columIndex)
        .findAll('.omi-picker-colum__list--item');

      fromArray(options).forEach((option, index) => {
        const text = option.text();
        const expection = origin[index].label;
        expect(text).to.equal(expection);
      });
    };
    await wrapper.vm.$nextTick();

    assert(1, colum2fresh);
    assert(2, colum3fresh);
  });
});
