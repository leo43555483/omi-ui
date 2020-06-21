# OmiSearch

## 安装

```js
import { Search } from 'omiui';
//or
import { Search } from 'omiui';
Vue.use(Search);
```

## 使用

### 基础用法

```html
<form action="#">
  <omi-search placeholder="搜索" v-model="search" cancelText="取消"></omi-search>
</form>
```

### 固定搜索键

```html
<form action="#">
  <omi-search placeholder="搜索" v-model="search" fixedCancel></omi-search>
</form>
```

### 禁用

```html
<form action="#">
  <omi-search placeholder="搜索" v-model="search" cancelText="取消" disabled></omi-search>
</form>
```

## Props

| name        | type    | default | description       |
| ----------- | ------- | ------- | ----------------- |
| disabled    | Boolean | false   | 是否禁用.         |
| value       | String  |         | 输入的值          |
| cancelText  | String  | cancel  | 取消按钮文案.     |
| placeholder | String  |         | input 占位符.     |
| fixedCancel | Boolean | false   | 是否固定取消按钮. |

## Event

| name   | params | description         |
| ------ | ------ | ------------------- |
| cancel | -      | 点击取消按钮时触发. |
| input  | value  | -                   |
| clear  | -      | 点击清除按钮时触发. |
| focus  | event  | 获取焦点时触发.     |

## Slots

| name        | description                               |
| ----------- | ----------------------------------------- |
| search-icon | 搜索 icon 插槽，可自定义搜索图标.         |
| clear-icon  | 清除按钮 icon 插槽，可自定义清除按钮图标. |
