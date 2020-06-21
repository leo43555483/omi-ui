# OmiSkeleton

## 安装

```js
import { CellGroup } from 'omiui';
//or
import { CellGroup } from 'omiui';
Vue.use(CellGroup);
```

## 使用

### 基础用法

```html
<omi-skeleton :loading="show"></omi-skeleton>
```

### 显示头像

```html
<omi-skeleton :loading="show" avatar></omi-skeleton>
```

### 设置行数

```html
<omi-skeleton :loading="show" :rows="5"></omi-skeleton>
```

### 设置行数

```html
<omi-skeleton :loading="show" :rows="5"></omi-skeleton>
```

### 形状

```html
<omi-skeleton :loading="show" buttonShape="square"></omi-skeleton>
```

### 禁止显示动画效果

```html
<omi-skeleton :loading="show" :animate="false"></omi-skeleton>
```

## Props

| name        | type    | default | description                            |
| ----------- | ------- | ------- | -------------------------------------- |
| animate     | Boolean | true    | 是否显示动画效果.                      |
| avatar      | Boolean | false   | 是否显示头像.                          |
| titleWidth  | Number  | 40      | 标题栏宽度.                            |
| buttonWidth | Number  | 100     | 正文栏宽度.                            |
| avatarSize  | Number  | 32      | 头像尺寸.                              |
| title       | Boolean | true    | 是否显示标题栏                         |
| loading     | Boolean | false   | 是否显示.                              |
| avatarShape | String  | round   | 头像框形状，['round','square'].        |
| buttonShape | String  | round   | 征文框形状，可选值 ['round','square']. |
| rows        | Number  | 3       | 可显示的行数.                          |
