# OmiRadio

## 安装

```js
import { Radio } from 'omiui';
//or
import { Radio } from 'omiui';
Vue.use(Radio);
```

## 使用

### 基础用法

```html
<omi-radio-group v-model="result">
  <omi-radio prop="b">content2</omi-radio>
</omi-radio-group>
```

### 禁用选项

```html
<omi-radio-group v-model="result">
  <omi-radio prop="a" disable active-color="red">content1</omi-radio>
  <omi-radio prop="b">content2</omi-radio>
</omi-radio-group>
```

## Props

| name        | type                  | default | description           |
| ----------- | --------------------- | ------- | --------------------- |
| activeColor | String                | -       | 选中后选择框的颜色.   |
| disable     | Boolean               | false   | 是否禁用.             |
| prop        | String Number Boolean | -       | 选择项的值.           |
| value       | Boolean               | false   | 是否选中当前.         |
| text        | String                |         | 文案.                 |
| size        | String Number         | -       | 尺寸.                 |
| square      | Boolean               | false   | 选择框是否以方形显示. |

## Methods

| name  | params  | return | description |
| ----- | ------- | ------ | ----------- |
| check | Boolean | -      |             |

## Events

| name   | params  | description |
| ------ | ------- | ----------- |
| change | checked | -           |
| input  | value   | -           |

## Slots

| name    | description       |
| ------- | ----------------- |
| default |                   |
| icon    | 选择框 icon 插槽. |
