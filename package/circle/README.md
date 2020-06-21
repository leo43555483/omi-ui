# OmiCircle

## 安装

```js
import { Circle } from 'omiui';
//or
import { Circle } from 'omiui';
Vue.use(Circle);
```

## 使用

### 基础用法

```html
<omi-circle :percentage="50" :circleRadius="60"></omi-circle>
```

### 逆时针

```html
<omi-circle :percentage="50" :circleRadius="60"></omi-circle>
```

### 自定义颜色

```html
<omi-circle :percentage="50" strokeColor="#3de23f" text="绿色"></omi-circle>
```

### 渐变色

<omi-circle :percentage="50" :strokeColor="{'0%': '#4ae23d','100%': '#d8268c'}" text="渐变色"></omi-circle>

## Props

| name          | type           | default | description                                      |
| ------------- | -------------- | ------- | ------------------------------------------------ |
| circleRadius  | Number         | 40      | 环半径                                           |
| strokeWidth   | Number String  | 40      | 线条宽度.                                        |
| strokeColor   | String Object  | -       | 线条颜色.                                        |
| clockwise     | Boolean        | true    | 顺时针动画.                                      |
| percentage    | String Number  | 0       | 当前进度(0-100).                                 |
| max           | Number         | 100     | 最大进度.                                        |
| text          | String         | -       | 圆圈中间的文字                                   |
| strokeLinecap | String         | -       | 线条端点形状，可选值['butt', 'round', 'square']. |
| transition    | Boolean String | ease    | 过渡动画.                                        |
