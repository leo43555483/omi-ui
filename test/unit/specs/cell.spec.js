
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Cell from '@/cell';
import Button from '@/button';
import Icon from '@/icon';

describe('Cell', () => {
  it('href', () => {
    const href = 'www.test.com';
    const wrapper = mount(Cell, {
      propsData: { href },
    });
    expect(wrapper.find('.omi-cell__inner').attributes('href')).to.equal(href);
  });

  it('clickable', () => {
    const wrapper = mount(Cell, {
      propsData: { clickable: true },
    });
    expect(wrapper.find('.omi-cell__clickable').exists()).to.true;
  });

  it('titleClass', () => {
    const titleClass = 'titleClass';
    const title = 'testtitle';
    const wrapper = mount(Cell, {
      propsData: { titleClass, title },
    });
    expect(wrapper.find(`.${titleClass}`).exists()).to.true;
  });

  it('contentClass', () => {
    const contentClass = 'contentClass';
    const content = 'testconent';
    const wrapper = mount(Cell, {
      propsData: { contentClass, content },
    });
    expect(wrapper.find(`.${contentClass}`).exists()).to.true;
  });

  it('title', () => {
    const title = 'cell title';
    const wrapper = mount(Cell, {
      propsData: { title },
    });
    expect(wrapper.find('.omi-cell__title > div').text()).to.equal(title);
  });

  it('label', () => {
    const label = 'cell label';
    const wrapper = mount(Cell, {
      propsData: { label },
    });
    expect(wrapper.find('.omi-cell__label').text()).to.equal(label);
  });

  it('content', () => {
    const content = 'cell content test';
    const wrapper = mount(Cell, {
      propsData: { content },
    });
    expect(wrapper.find('.omi-cell__content--body > span').text()).to.equal(content);
  });

  it('rightArrow', () => {
    const wrapper = mount(Cell, {
      propsData: { rightArrow: true },
    });
    expect(wrapper.find('.omi-cell__right--icon').exists()).to.true;
    expect(wrapper.find('.omi-cell__right--icon').contains('.omi-enter')).to.true;
  });

  it('titleAlign', () => {
    const wrapper = mount(Cell, {
      propsData: { titleAlign: 'center', title: 'test' },
    });
    const styles = wrapper.find('.omi-cell__title').attributes('style');
    expect(styles).to.equal('text-align: center;');
  });

  it('set titleWidth by number string', () => {
    const width = '75';
    const wrapper = mount(Cell, {
      propsData: { titleWidth: width, title: 'test' },
    });
    const styles = wrapper.find('.omi-cell__title').attributes('style');
    expect(styles).to.includes(`width: ${width}px;`);
  });

  it('set titleWidth by number', () => {
    const width = 60;
    const wrapper = mount(Cell, {
      propsData: { titleWidth: width, title: 'test' },
    });
    const styles = wrapper.find('.omi-cell__title').attributes('style');
    expect(styles).to.includes(`width: ${width}px;`);
  });

  it('set titleWidth by unit string', () => {
    const width = '60rem';
    const wrapper = mount(Cell, {
      propsData: { titleWidth: width, title: 'test' },
    });
    const styles = wrapper.find('.omi-cell__title').attributes('style');
    expect(styles).to.includes(`width: ${width};`);
  });

  it('contentAlign', () => {
    const wrapper = mount(Cell, {
      propsData: { contentAlign: 'center', content: 'test' },
    });
    const styles = wrapper.find('.omi-cell__content--body').attributes('style');
    expect(styles).to.equal('text-align: center;');
  });

  it('contentStyle', () => {
    const contentStyle = 'color: red;';
    const wrapper = mount(Cell, {
      propsData: { contentStyle, content: 'test' },
    });
    const styles = wrapper.find('.omi-cell__content--body').attributes('style');
    expect(styles).to.equal(contentStyle);
  });

  it('titleStyle', () => {
    const titleStyle = 'color: blue; width: 30px;';
    const wrapper = mount(Cell, {
      propsData: { titleStyle, title: 'test' },
    });
    const styles = wrapper.find('.omi-cell__title').attributes('style');
    expect(styles).to.equal(titleStyle);
  });

  it('content slots', () => {
    const text = 'content Slots';
    const wrapper = mount(Cell, {
      slots: {
        content: `<span class="contentSlot">${text}</span>`,
      },
    });
    expect(wrapper.find('.omi-cell__content--body').contains('.contentSlot')).to.true;
    expect(wrapper.find('.contentSlot').text()).contains(text);
  });

  it('title slots', () => {
    const text = 'title Slots';
    const wrapper = mount(Cell, {
      slots: {
        title: `<span class="titleSlot">${text}</span>`,
      },
    });
    expect(wrapper.find('.omi-cell__title').contains('.titleSlot')).to.true;
    expect(wrapper.find('.titleSlot').text()).contains(text);
  });

  it('label slots', () => {
    const text = 'label Slots';
    const wrapper = mount(Cell, {
      slots: {
        title: `<span class="labelSlot">${text}</span>`,
      },
    });
    expect(wrapper.find('.omi-cell__title').contains('.labelSlot')).to.true;
    expect(wrapper.find('.labelSlot').text()).contains(text);
  });

  it('extra slots', () => {
    const text = 'extra Slots';
    const wrapper = mount(Cell, {
      slots: {
        extra: `<omi-button class="extraSlot">${text}</omi-button>`,
      },
      stubs: {
        'omi-button': Button,
      },
    });
    expect(wrapper.find('.omi-cell__extra').contains('.extraSlot')).to.true;
    expect(wrapper.find('.extraSlot').text()).contains(text);
  });

  it('extra slots', () => {
    const text = 'extra Slots';
    const wrapper = mount(Cell, {
      slots: {
        extra: `<omi-button class="extraSlot">${text}</omi-button>`,
      },
      stubs: {
        'omi-button': Button,
      },
    });
    expect(wrapper.find('.omi-cell__extra').contains('.extraSlot')).to.true;
    expect(wrapper.find('.extraSlot').text()).contains(text);
  });

  it('left icon slots', () => {
    const wrapper = mount(Cell, {
      slots: {
        'left-icon': '<omi-icon type="enter"></omi-icon>',
      },
      stubs: {
        'omi-icon': Icon,
      },
    });
    expect(wrapper.find('.omi-cell__left--icon').contains('.omi-enter')).to.true;
  });

  it('right icon slots', () => {
    const wrapper = mount(Cell, {
      slots: {
        'right-icon': '<omi-icon type="search"></omi-icon>',
      },
      stubs: {
        'omi-icon': Icon,
      },
    });
    expect(wrapper.find('.omi-cell__right--icon').contains('.omi-search')).to.true;
  });
});
