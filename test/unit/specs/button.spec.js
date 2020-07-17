
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Button from '@/button';

describe('Button', () => {
  it('text', () => {
    const text = 'test';
    const wrapper = shallowMount(Button, {
      propsData: { text },
    });
    expect(wrapper.find('.omi-btn__text').text()).contains(text);
  });

  it('Show loadingText when loading set true', () => {
    const loadingText = 'loading text';
    const wrapper = shallowMount(Button, {
      propsData: { loadingText, loading: true },
    });
    expect(wrapper.find('.omi-btn__text').text()).contains(loadingText);
  });

  it('size', () => {
    const sizes = ['normal', 'small', 'mini'];
    sizes.forEach((size) => {
      const wrapper = shallowMount(Button, {
        propsData: { size },
      });
      expect(wrapper.find('.omi-btn').classes(`omi-btn__${size}`)).to.true;
    });
  });

  it('block', () => {
    const wrapper = shallowMount(Button, {
      propsData: { block: true },
    });
    expect(wrapper.find('.omi-btn').classes('omi-btn__block')).to.true;
  });

  it('type', () => {
    const types = ['default', 'primary', 'danger', 'info', 'warning', 'success'];
    types.forEach((type) => {
      const wrapper = shallowMount(Button, {
        propsData: { type },
      });
      expect(wrapper.find('.omi-btn').classes(`omi-btn__${type}`)).to.true;
    });
  });

  it('round', () => {
    const wrapper = shallowMount(Button, {
      propsData: { round: true },
    });
    expect(wrapper.find('.omi-btn').classes('omi-btn__round')).to.true;
  });

  it('square', () => {
    const wrapper = shallowMount(Button, {
      propsData: { round: false },
    });
    expect(wrapper.find('.omi-btn').classes('omi-btn__round')).to.false;
  });
  it('disabled', () => {
    const wrapper = shallowMount(Button, {
      propsData: { disabled: true },
    });
    expect(wrapper.find('.omi-btn').classes('omi-btn__disable')).to.true;
  });

  it('text slots', () => {
    const text = 'text Slots';
    const wrapper = shallowMount(Button, {
      slots: {
        default: `<span class="textSlot">${text}</span>`,
      },
    });
    expect(wrapper.find('.textSlot').text()).contains(text);
  });
});
