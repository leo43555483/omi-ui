# OmiTabbarItem

## 安装

```js
import { TabBarItem } from 'omiui';
//or
import { TabBarItem } from 'omiui';
Vue.use(TabBarItem);
```

## 使用

### 基础用法

```html
<template>
  <div class="demo-tabbar">
    <omi-tabbar v-model="activeTab">
      <omi-tabbar-item icon-type="homepage" name="home">home</omi-tabbar-item>
      <omi-tabbar-item icon-type="interactive" name="message">message</omi-tabbar-item>
      <omi-tabbar-item icon-type="mine" name="profile">profile</omi-tabbar-item>
    </omi-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: 'home',
      };
    },
  };
</script>
```

### 显示徽章

```html
<template>
  <div class="demo-tabbar">
    <omi-tabbar v-model="activeTab">
      <omi-tabbar-item icon-type="homepage" name="home" dot>home</omi-tabbar-item>
      <omi-tabbar-item icon-type="interactive" name="message" dotText="15">message</omi-tabbar-item>
      <omi-tabbar-item icon-type="mine" name="profile" dotText="99">profile</omi-tabbar-item>
    </omi-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'DemoTabbar',
    data() {
      return {
        activeTab: 'home',
      };
    },
  };
</script>
```

### 页面跳转

```html
<template>
  <div class="demo-tabbar">
    <omi-tabbar v-model="activeTab">
      <omi-tabbar-item icon-type="homepage" name="home" to="/home">home</omi-tabbar-item>
      <omi-tabbar-item icon-type="interactive" name="message" to="/message">message</omi-tabbar-item>
      <omi-tabbar-item icon-type="mine" name="profile" to="/profile">profile</omi-tabbar-item>
    </omi-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'DemoTabbar',
    data() {
      return {
        activeTab: 'home',
      };
    },
  };
</script>
```

## Props

| name         | type    | default | description                                                               |
| ------------ | ------- | ------- | ------------------------------------------------------------------------- |
| name         | String  | -       | 当前选项标识符,若未填写，则取该选项下标.                                  |
| dot          | Boolean | false   | 是否显示徽章圆点.                                                         |
| dotMaxNumber | Number  | -       | 徽章最大可显示数值.                                                       |
| dotText      | String  |         | 徽章文案.                                                                 |
| iconType     | String  |         | icon 种类，可选值请查看[icon]().                                          |
| iconSize     | Number  | -       | icon 大小.                                                                |
| activeColor  | String  | -       | 选中时的颜色.                                                             |
| to           | String  | -       | 等同 [`<router-link> to`](https://router.vuejs.org/zh/api/#to).           |
| replace      | Boolean | false   | 等同 [`<router-link> replace`](https://router.vuejs.org/zh/api/#replace). |
| tag          | String  | div     | 等同 [`<router-link> tag`](https://router.vuejs.org/zh/api/#tag).         |
| event        | String  | -       | 等同 [`<router-link> tag`](https://router.vuejs.org/zh/api/#event).       |
| append       | Boolean | false   | 等同 [`<router-link> append`](https://router.vuejs.org/zh/api/#append)    |
| href         | String  | -       | 跳转的地址，等同于 a 标签的 href 属性.                                    |

## Slots

| name    | description |
| ------- | ----------- |
| defualt |             |
| icon    |             |
