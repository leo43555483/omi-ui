import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import AddressPicker from '@/address-picker';
import address from '../mock/address';
import { fromArray } from '../utils/shared';

chai.use(sinonChai);
const createAdressPicker = (props = {}, opt = {}) => {
  const wrapper = mount(AddressPicker, {
    propsData: { data: address, ...props },
    ...opt,
  });
  return wrapper;
};

const expectedSingleColum = (data) => {
  const wrapper = createAdressPicker({ data });
  const columElement = wrapper.vm.$el.querySelectorAll('.omi-picker-colum__list');
  const lists = fromArray(columElement);
  const colum = fromArray(lists[0].querySelectorAll('.omi-picker-colum__list--item'));
  expect(lists.length).to.equal(1);
  expect(colum.length).to.equal(2);
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
    expectedSingleColum(data);
  });

  it('only city data', () => {
    const data = {
      cityList: {
        110000: 'city1',
        120000: 'city2',
      },
    };
    expectedSingleColum(data);
  });

  it('only area data', () => {
    const data = {
      areaList: {
        110000: 'area1',
        120000: 'area2',
      },
    };
    expectedSingleColum(data);
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

  it('trigger change event', async () => {
    const onChange = sinon.spy();
    const data = {
      provinceList: {
        110000: 'province1',
        120000: 'province2',
      },
    };

    const wrapper = createAdressPicker(
      { data },
      {
        listeners: {
          change: onChange,
        },
      },
    );

    const colum = wrapper.findAll('.omi-picker-colum__list').at(0);
    const item = colum.findAll('.omi-picker-colum__list--item').at(1);
    item.trigger('click');

    await wrapper.vm.$nextTick();
    colum.trigger('transitionend');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isScrolling()).to.false;
    expect(onChange).to.be.calledOnce;
  });
});
