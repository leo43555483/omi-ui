# OmiButton

## 安装

```js
import { Button } from 'omiui';
//or
import { Button } from 'omiui';
Vue.use(Button);
```

## 使用

### 基础用法

```html
<omi-button type="danger">danger</omi-button>
```

### 显示加载中

```html
<omi-button :loading="true" type="primary">加载中</omi-button>
```

### 设置尺寸

```html
<omi-button size="normal" type="primary">正常</omi-button>
<omi-button size="small" type="primary">小的</omi-button>
<omi-button size="mini" type="primary">迷你的</omi-button>
```

### 块级显示

```html
<omi-button block type="primary">会占满一行</omi-button>
```

### 圆角显示

```html
<omi-button round type="primary">圆角</omi-button>
```

## Props

| name        | type    | default | description                                                               |
| ----------- | ------- | ------- | ------------------------------------------------------------------------- |
| size        | String  | normal  | 尺寸,可选值['normal', 'small', 'mini'].                         |
| nativeType  | String  | button  | 原生 type 属性.                                                           |
| type        | String  | primary | 风格，可选值 [ 'default','primary','danger','info','warning','success' ]. |
| block       | Boolean | false   | 是否块级显示按钮.                                                         |
| text        | String  |         | 按钮文本.                                                                 |
| loadingText | String  |         | loading为true显示的文案.                                                             |
| round       | Boolean | false   | 是否以圆角显示按钮.                                                       |
| disabled    | Boolean | false   | 是否禁用.                                                                 |
| loading     | Boolean | false   | 是否显示加载中.                                                           |

## Slots

| name    | description  |
| ------- | ------------ |
| default | 按钮文本内容 |
