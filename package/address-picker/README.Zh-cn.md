# OmiAddressPicker

## Install

```js
import { AddressPicker } from 'omiui';
//or
import { AddressPicker } from 'omiui';
Vue.use(AddressPicker);
```

## Useage

### Basic Useage

```html
  <omi-address-picker
    ref="picker"
    :data="address"
    title="Area"
    :onConfirm="onConfirm"
    :onCancel="onCancel"
    @change="onChange"
  />
</omi-action-sheet>
```

### <span id="data-structure">Address Data Structure</span>

```js
  {
    provinceList:{
      130000: '河北省',
    },
    cityList: {
      130100: '石家庄市',
      ...
    },
    areaList: {
      130104: '桥西区',
      ...
    },
  }

```

*key* 为6位数邮政编码, 其中前两位为省或州的编码, 中间两位为市级编码, 最后两位为区县编码, 例如*130104*, 13是省级编码, 01为市级编码, 04位区编码. 
Click [here](https://github.com/leo43555483/omi-ui/blob/dev/examples/data/address.js) for detail.

## Props

| name         | type     | default      | description                                                            |
| ------------ | -------- | ------------ | ---------------------------------------------------------------------- |
| defaultIndex | Number   | 0            | 指定该值后将会在初始状态时默认滚动到相应下标的位置，如果指定下标选项不存在则滚动到第一个选项.                             |
| data         | Object   | -            | [description](#data-structure)                                         |
| title        | String   |              | 标题.                                                          |
| confirmText  | String   |              | 确认按钮的文案，若未设置则不会显示. |
| cancelText   | String   |              | 取消按钮的文案，若未设置则不会显示.  |
| onConfirm    | Function | function(){} | 点击确认按钮时触发.                                    |
| onCancel     | Function | function(){} | 点击取消按钮时触发.                                     |

## Methods
| name      | params | return | description |
| --------- | ------ | ------ | ----------- |
| getValues |        | Array  | 返回当前选中值.            |

## Events

| name   | params        | description |
| ------ | ------------- | ----------- |
| change | values: Array | 滚动结束后触发.           |
