# OmiNavBar

## 安装

```js
import { NavBar } from 'omiui';
//or
import { NavBar } from 'omiui';
Vue.use(NavBar);
```

## 使用

### 基础用法

```html
<omi-nav-bar
  title="导航栏"
  left="首页"
  right="编辑"
  @clickLeft="onClickLeft"
  @clickRight="clickRight"
></omi-nav-bar>
```

### 插槽

```html
<omi-nav-bar title="导航栏" left="首页">
  <template #right>
    <div class="demo-nav-bar__right">
      <omi-icon type="search"></omi-icon>
    </div>
  </template>
</omi-nav-bar>
```

## Props

| name          | type    | default | description            |
| ------------- | ------- | ------- | ---------------------- |
| showLeftArrow | Boolean | true    | 是否显示左侧箭头 icon. |
| title         | String  | -       | 标题.                  |
| right         | String  | -       | 左侧文本.              |
| left          | String  | -       | 右侧文本.              |

## Events

| name       | params | description         |
| ---------- | ------ | ------------------- |
| clickLeft  | -      | 点击左侧按钮时触发. |
| clickRight | -      | 点击右侧按钮时触发. |

## Slots

| name  | description |
| ----- | ----------- |
| left  | -           |
| right | -           |
