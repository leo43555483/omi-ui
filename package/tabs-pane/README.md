# OmiTabsPane

## 安装

```js
import { TabsPane } from 'omiui';
//or
import { TabsPane } from 'omiui';
Vue.use(TabsPane);
```

## 使用

## 基础用法

```html
<template>
  <div class="demo-tabs">
    <omi-tabs v-model="tab">
      <omi-tabs-pane name="content1" label="tab1">
        <div class="demo-tab-item">内容1</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content2" label="tab2">
        <div class="demo-tab-item">内容2</div>
      </omi-tabs-pane>
    </omi-tabs>
  </div>
</template>

<script>
  export default {
    name: 'DemoTabs',
    data() {
      return {
        tab: 'content2',
      };
    },
  };
</script>
```

## 手指滑动切换

```html
<template>
  <div class="demo-tabs">
    <omi-tabs v-model="tab" animated swipleable>
      <omi-tabs-pane name="content1" label="tab1">
        <div class="demo-tab-item">内容1</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content2" label="tab2">
        <div class="demo-tab-item">内容2</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content3" label="tab3">
        <div class="demo-tab-item">内容3</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content4" label="tab4">
        <div class="demo-tab-item">内容4</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content5" label="tab5">
        <div class="demo-tab-item">内容5</div>
      </omi-tabs-pane>
    </omi-tabs>
  </div>
</template>

<script>
  export default {
    name: 'DemoTabs',
    data() {
      return {
        tab: 'content2',
      };
    },
  };
</script>
```

## 显示徽章

```html
<template>
  <div class="demo-tabs">
    <omi-tabs v-model="tab" animated swipleable>
      <omi-tabs-pane name="content1" label="tab1" dot>
        <div class="demo-tab-item">内容1</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content2" label="tab2" badgeText="16">
        <div class="demo-tab-item">内容2</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content3" label="tab3" :badgeText="100">
        <div class="demo-tab-item">内容3</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content4" label="tab4">
        <div class="demo-tab-item">内容4</div>
      </omi-tabs-pane>
      <omi-tabs-pane name="content5" label="tab5">
        <div class="demo-tab-item">内容5</div>
      </omi-tabs-pane>
    </omi-tabs>
  </div>
</template>

<script>
  export default {
    name: 'DemoTabs',
    data() {
      return {
        tab: 'content2',
      };
    },
  };
</script>
```

## Props

| name         | type          | default | description                               |
| ------------ | ------------- | ------- | ----------------------------------------- |
| dot          | Boolean       | false   | 是否显示徽章圆点.                         |
| dotMaxNumber | Number        | -       | 徽章最大可显示数值.                       |
| dotText      | String        |         | 徽章文案.                                 |
| label        | String        |         | tab 按钮文案.                             |
| name         | String Number | -       | 当前 tab 标识符,未设置则使用当前选项下标. |
| disabled     | Boolean       | false   | 是否禁用.                                 |

## Slots

| name    | description |
| ------- | ----------- |
| default |             |
