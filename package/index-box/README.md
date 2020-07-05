# OmiIndexBox

## 安装

```js
import { IndexBox } from 'omiui';
//or
import { IndexBox } from 'omiui';
Vue.use(IndexBox);
```

##使用

### 基本用法

```html
<template>
  <div class="demo-index-box">
    <omi-index-box>
      <div v-for="(item) in indexList" :key="item.index">
        <omi-index-anchor :title="item.title" :index="item.index" />
        <div class="demo-index-anchor__content">{{item.title}}</div>
      </div>
    </omi-index-box>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        indexList: [],
      };
    },
    methods: {
      onSelect(e) {
        console.log(e);
      },
      getIndex(i) {
        const char = 'A'.charCodeAt();
        return String.fromCharCode(char + i);
      },
    },
    mounted() {
      const { getIndex } = this;
      for (let i = 0; i < 26; i++) {
        this.indexList.push({ title: getIndex(i), index: getIndex(i) });
      }
    },
  };
</script>
```

## Props

| name         | type    | default | description                 |
| ------------ | ------- | ------- | --------------------------- |
| fixAnchor    | Boolean | true    | anchor 是否吸顶.            |
| indexs       | Array   | A-Z     |                             |
| showIndexTip | Boolean | true    | 点击索引时是否显示索引提示. |

## Events

| name   | params | description           |
| ------ | ------ | --------------------- |
| select | -      | 点击左侧索引项时触发. |
