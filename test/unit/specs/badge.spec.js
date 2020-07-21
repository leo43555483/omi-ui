import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Badge from '@/badge';

describe('Badge', () => {
  it('text', () => {
    const text = 'test';
    const wrapper = shallowMount(Badge, {
      propsData: { text },
    });
    expect(wrapper.find('.omi-badge__text').text()).contains(text);
  });

  it('dot', () => {
    const wrapper = shallowMount(Badge, {
      propsData: { dot: true },
    });
    expect(wrapper.find('.omi-badge__dot').exists()).to.true;
  });

  it('maxNumber', () => {
    const maxNumber = 150;
    const text = 100;
    const wrapper = shallowMount(Badge, {
      propsData: { maxNumber, text },
    });
    expect(wrapper.find('.omi-badge__text').text()).contains(text);
  });

  it('default slots', () => {
    const text = 'badge Slots';
    const wrapper = shallowMount(Badge, {
      slots: {
        default: `<span class="badgeSlot">${text}</span>`,
      },
    });
    expect(wrapper.find('.omi-badge').contains('.badgeSlot')).to.true;
    expect(wrapper.find('.badgeSlot').text()).contains(text);
  });
});
