# OmiFormItem

## 安装

```js
import { FormItem } from 'omiui';
//or
import { FormItem } from 'omiui';
Vue.use(FormItem);
```

## 使用

请查看[Form]().

## Props

| name         | type          | default | description                |
| ------------ | ------------- | ------- | -------------------------- |
| labelWith    | String Number | -       | label 宽度.                |
| showStatus   | Boolean       | true    | 是否显示状态提示.          |
| showRequired | Boolean       | true    | 是否显示必填提示号.        |
| labelFor     | String        | -       | 等同于 label 中的*for*属性 |
| rules        | Array         |         | 校验规则.                  |
| colon        | Boolean       | false   | 是否显示冒号.              |
| name         | String        |         |                            |
| label        | String        |         |                            |
