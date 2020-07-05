# OmiLoading

## 安装

```js
import { Loading } from 'omiui';
//or
import { Loading } from 'omiui';
Vue.use(Loading);
```

## 使用

### 自定义颜色及尺寸

```html
<omi-loading size="30" color="#2d8cf0" />
```

### 显示加载文案

```html
<omi-loading loading-text="加载中..." />
```

### _spinner_ 风格

```html
<omi-loading spinner />
```

## Props

| name        | type          | default | description              |
| ----------- | ------------- | ------- | ------------------------ |
| spinner     | Boolean       | false   | 是否以 spinner 风格显示. |
| size        | String Number | -       | 尺寸.                    |
| color       | String        | -       | 颜色                     |
| loadingText | String        | -       | 文案提示.                |
