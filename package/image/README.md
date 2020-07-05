# OmiImage

## 安装

```js
import { Image } from 'omiui';
//or
import { Image } from 'omiui';
Vue.use(Image);
```

## 使用

### 基本用法

```html
<omi-image placeholder-height="180px" :key="index" :src="img" />
```

### 使用懒加载

```html
<omi-image lazy-load placeholder-height="180px" :key="index" :src="img" />
```

## Props

| name              | type          | default | description                                              |
| ----------------- | ------------- | ------- | -------------------------------------------------------- |
| placeholderWidth  | String Number | 100%    | 图片加载时占位区的宽度.                                  |
| placeholderHeight | String Number | 50px    | 图片加载时占位区的高度.                                  |
| height            | String Number | -       | 高度.                                                    |
| width             | String Number | -       | 宽度.                                                    |
| lazyLoad          | Boolean       | false   | 是否启用[lazyload](https://github.com/tuupola/lazyload). |
| src               | String        |         |                                                          |
| iconSize          | Number        | 24      | 加载和错误提示 icon 的大小.                              |

## Events

| name   | params | description         |
| ------ | ------ | ------------------- |
| loaded | img    | 图片加载后触发.     |
| error  | img    | 图片加载失败后触发. |
