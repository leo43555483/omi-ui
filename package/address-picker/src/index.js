import Picker from '../../picker';
import {
  formateAddres,
  PROVINCE,
  CTIY,
  AREA,
} from './util';
import { unDef } from '../../../src/utils/shared';

const DEFAULT_INDEX = 0;
const AddressPicker = () => ({
  name: 'OmiAddressPicker',
  data() {
    return {
      address: [],
    };
  },
  props: {
    defaultIndex: {
      type: Number,
      default: DEFAULT_INDEX,
    },
    data: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler() {
        this.formateData();
      },
      immediate: true,
    },
  },
  methods: {
    onChange(...params) {
      this.$emit('change', ...params);
    },
    formateData() {
      if (!this.data) return;
      const provinceMap = {};
      const cityMap = {};
      const { provinceList, cityList, areaList } = this.data;
      const provinces = formateAddres(provinceList, PROVINCE, provinceMap, null, null, unDef(cityList));

      const cities = formateAddres(cityList, CTIY, cityMap, PROVINCE, null, unDef(areaList));

      formateAddres(
        areaList,
        AREA,
        null,
        CTIY,
        (node, code) => {
          const { province: provinceCode, city: cityCode, area: areaCode } = code;
          const parentKey = `${provinceCode}${cityCode}`;
          const cityIndex = cityMap[parentKey];
          if (!unDef(cityIndex)) {
            cities[cityIndex].children.push(node);
          } else {
            cities.push(node);
            cityMap[areaCode] = cities.length - 1;
          }
        },
        true,
      );

      cities.forEach((city) => {
        const { parentCode, selfCode } = city;
        const index = provinceMap[parentCode];
        if (!unDef(index) && !unDef(provinces[index]) && !unDef(provinces[index].children)) {
          provinces[index].children.push(city);
        } else {
          const isOverSea = parentCode * 1 >= 90;
          if (isOverSea) {
            const overSeaIndex = provinceMap['90'];
            provinces[overSeaIndex].children.push(city);
          } else {
            provinces.push(city);
            provinceMap[selfCode] = provinces.length - 1;
          }
        }
      });
      this.address = provinces;
    },

    /**
     * @vue2doc-exposed-api:getValues
     * @return {Array} values
     */
    getValues() {
      return this.$refs.picker.getValues().map(({ label, value }) => ({ label, value }));
    },

    /**
     * @vue2doc-exposed-api:isScrolling
     * @return {Boolean}
     */
    isScrolling() {
      return this.$refs.picker.isScrolling();
    },
  },
  render() {
    return (
      <Picker
        cascade
        ref="picker"
        data={this.address}
        title={this.title}
        confirmText={this.confirmText}
        cancelText={this.cancelText}
        defaultIndex={this.defaultIndex}
        onChange={this.onChange}
        {...{
          props: {
            onConfirm: () => this.onConfirm(),
            onCancel: () => this.onCancel(),
          },
        }}
      />
    );
  },
});

export default AddressPicker();
