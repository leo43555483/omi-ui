# OmiCheckboxGroup

## 安装

```js
import { CheckboxGroup } from 'omiui';
//or
import { CheckboxGroup } from 'omiui';
Vue.use(CheckboxGroup);
```

## 使用

请参考[checkbox]()

## Props

| name        | type          | default | description              |
| ----------- | ------------- | ------- | ------------------------ |
| max         | String Number | -1      | 最大可选择数.            |
| disable     | Boolean       | false   | 是否禁用.                |
| horizontal  | Boolean       | false   | 是否水平显示.            |
| value       | Array         |         | 选中的值.                |
| activeColor | String        | -       | checkbox 被选中时的颜色. |

## Events

| name   | params | description |
| ------ | ------ | ----------- |
| change | -      | -           |
| input  | -      | -           |

## Slots

| name    | description |
| ------- | ----------- |
| default | -           |
