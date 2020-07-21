import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Picker from '@/picker';

chai.use(sinonChai);

describe('Picker', () => {
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

    const wrapper = mount(Picker, {
      propsData: { data },
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
    const target = wrapper.vm.getTarget(0);
    expect(target[0]).to.true;
    expect(onChange).to.be.calledOnce;
  });
});
