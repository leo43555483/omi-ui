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
<omi-action-sheet v-model="open">
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

Key is a 6-digit zip code, the first two are state or province codes, the middle two are city codes, last two are area codes,
like*130104*, 13 is NO. of province, 01 is NO. of city, 04 is NO. of area.
Click [here](https://github.com/leo43555483/omi-ui/blob/dev/examples/data/address.js) for detail.

## Props

| name         | type     | default      | description                                                            |
| ------------ | -------- | ------------ | ---------------------------------------------------------------------- |
| defaultIndex | Number   | 0            | The index of the selected item by default.                             |
| data         | Object   | -            | [description](#data-structure)                                         |
| title        | String   |              | Picker title.                                                          |
| confirmText  | String   |              | Text of confirm button. If not set, the cancel button is not displayed |
| cancelText   | String   |              | Text of cancel button. If not set, the cancel button is not displayed  |
| onConfirm    | Function | function(){} | Callback when click confirm button.                                    |
| onCancel     | Function | function(){} | Callback when click cancel button.                                     |

## Methods

| name      | params | return | description |
| --------- | ------ | ------ | ----------- |
| getValues |        | Array  |             |

## Event

| name   | params        | description |
| ------ | ------------- | ----------- |
| change | values: Array | -           |
