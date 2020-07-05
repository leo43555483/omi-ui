# OmiTabs

## 安装

```js
import { Tabs } from 'omiui';
//or
import { Tabs } from 'omiui';
Vue.use(Tabs);
```
## 使用
*详情请查看[tabs-pane]()*

## Props

| name                | type          | default | description           |
| ------------------- | ------------- | ------- | --------------------- |
| titleScrollDuration | Number        | 300     | title 滚动动效时间.   |
| swipleable          | Boolean       | false   | 是否允许手指滑动操作. |
| animated            | Boolean       | false   | 是否使用动画效果.     |
| value               | String Number | 0       | 当前选中面板.         |

## Events

| name     | params          | description          |
| -------- | --------------- | -------------------- |
| change   | activeKey,label |                      |
| input    | activeKey       |                      |
| clickTab | tabName,label   | 点击 tab 按钮时触发. |

## Slots

| name    | description |
| ------- | ----------- |
| default |             |
