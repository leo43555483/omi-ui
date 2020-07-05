# OmiTabbar

## 安装

```js
import { TabBar } from 'omiui';
//or
import { TabBar } from 'omiui';
Vue.use(TabBar);
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

_详情请查看[tab-bar-item]()_

## Props

| name        | type          | default | description                                   |
| ----------- | ------------- | ------- | --------------------------------------------- |
| value       | String Number | 0       | 当前选中的[tab-bar-item]()对应的 name 或下标. |
| iconSize    | Number        | -       | icon 大小.                                    |
| activeColor | String        | -       | 选中时的颜色.                                 |
| zIndex      | Number        | -       |                                               |

## Events

| name   | params      | description |
| ------ | ----------- | ----------- |
| input  | activeIndex | -           |
| change | activeIndex | -           |

## Slots

| name    | description |
| ------- | ----------- |
| defualt |             |

