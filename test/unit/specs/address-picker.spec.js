import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import AddressPicker from '@/address-picker';
import address from '../mock/address';
import { fromArray } from '../utils/shared';

const createAdressPicker = (props = {}, opt = {}) => {
  const wrapper = mount(AddressPicker, {
    propsData: { data: address, ...props },
    ...opt,
  });
  return wrapper;
};
describe('AddressPicker', () => {
  it('defaultIndex', () => {
    const defaultIndex = 1;
    const wrapper = createAdressPicker({ defaultIndex });
    const lists = fromArray(wrapper.findAll('.omi-picker-colum__list'));
    lists.forEach((colum) => {
      const items = colum.findAll('.omi-picker-colum__list--item');
      const itemLength = items.length;
      const currentIndex = colum + 1 >= itemLength ? 0 : defaultIndex;
      expect(items.at(currentIndex).classes()).to.include('omi-picker-colum__list--active');
    });
  });

  it('only province data', () => {
    const data = {
      provinceList: {
        110000: 'province1',
        120000: 'province2',
      },
    };
    const wrapper = createAdressPicker({ data });
    const columElement = wrapper.vm.$el.querySelectorAll('.omi-picker-colum__list');
    const lists = fromArray(columElement);
    const colum = fromArray(lists[0].querySelectorAll('.omi-picker-colum__list--item'));
    expect(lists.length).to.equal(1);
    expect(colum.length).to.equal(2);
  });

  it('title', () => {
    const title = 'address picker';
    const wrapper = createAdressPicker({ title });
    expect(wrapper.find('.omi-picker__title').text()).to.equal(title);
  });

  it('confirmText', () => {
    const confirmText = 'confirm';
    const wrapper = createAdressPicker({ confirmText });
    expect(wrapper.find('.omi-picker__confirm').text()).to.equal(confirmText);
  });

  it('cancelText', () => {
    const cancelText = 'cancel';
    const wrapper = createAdressPicker({ cancelText });
    expect(wrapper.find('.omi-picker__cancel').text()).to.equal(cancelText);
  });
});
