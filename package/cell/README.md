# OmiCell

## 安装

```js
import { Cell } from 'omiui';
//or
import { Cell } from 'omiui';
Vue.use(Cell);
```

## 使用

## 基础用法

```html
<omi-cell title="basic useage">content</omi-cell>
```

## 自定义标题宽

```html
<omi-cell title="title width" title-width="90">content</omi-cell>
```

## 显示右侧箭头

```html
<omi-cell rightArrow>home</omi-cell>
```

## 路由跳转

```html
<omi-cell to="/">home</omi-cell>
```

## 页面跳转

```html
<omi-cell href="/">home</omi-cell>
```

## 结合 Input 使用

```html
<omi-cell title="title2" rightArrow>
  <omi-input slot="content" placeholder="请输入文字" />
  <template slot="extra">
    <omi-button size="mini">button</omi-button>
  </template>
</omi-cell>
```

## Props

| name         | type          | default | description                                                               |
| ------------ | ------------- | ------- | ------------------------------------------------------------------------- |
| to           | String        | -       | 等同 [`<router-link> to`](https://router.vuejs.org/zh/api/#to).           |
| replace      | Boolean       | false   | 等同 [`<router-link> replace`](https://router.vuejs.org/zh/api/#replace). |
| tag          | String        | div     | 等同 [`<router-link> tag`](https://router.vuejs.org/zh/api/#tag).         |
| event        | String        | -       | 等同 [`<router-link> tag`](https://router.vuejs.org/zh/api/#event).       |
| append       | Boolean       | false   | 等同 [`<router-link> append`](https://router.vuejs.org/zh/api/#append)    |
| href         | String        | -       | 跳转的地址，等同于 a 标签的 href 属性.                                    |
| rightArrow   | Boolean       | false   | 是否显示右侧箭头.                                                         |
| clickable    | Boolean       | false   | 是否为可点击.                                                             |
| titleClass   | String        |         | 标题的样式名.                                                             |
| cententClass | String        |         | 内容的样式名.                                                             |
| titleStyle   | String        | -       | 标题的样式.                                                               |
| contentStyle | String        | -       | 内容的样式.                                                               |
| title        | String        |         | 标题文本.                                                                 |
| label        | String        |         | 标签文本.                                                                 |
| content      | String        |         | 内容文本.                                                                 |
| titleAlign   | String        | left    | 标题对其方式.                                                             |
| titleWidth   | String Number | -       | 标题元素的宽度.                                                           |
| contentAlign | String        | center  | 内容的对其方式.                                                           |

## Slots

| name       | description       |
| ---------- | ----------------- |
| content    | 内容插槽.         |
| title      | 标题插槽.         |
| label      | 标签插槽.         |
| extra      | 右侧操作区域插槽. |
| right-icon | 右侧 icon 插槽.   |
| left-icon  | 左侧 icon 插槽.   |
