# OmiCollapse

## 安装

```js
import { Collapse } from 'omiui';
//or
import { Collapse } from 'omiui';
Vue.use(Collapse);
```

## 使用

### 基础用法

```html
<omi-collapse v-model="list">
  <omi-collapse-item name="a" title="标题1" disable>
    content1
  </omi-collapse-item>
  <omi-collapse-item name="b" title="标题2">
    <div>
      content2
    </div>
  </omi-collapse-item>
</omi-collapse>
<script>
  export default {
    data() {
      return {
        list: ['a'],
      };
    },
  };
</script>
```

## Props

| name      | type    | default | description             |
| --------- | ------- | ------- | ----------------------- |
| value     | Array   |         | 当前已经打开的 name 值. |
| accordion | Boolean | false   | 手风琴模式.             |

## Event

| name  | params | description |
| ----- | ------ | ----------- |
| input | -      | -           |

# OmiCollapseItem

## Props

| name    | type          | default | description |
| ------- | ------------- | ------- | ----------- |
| disable | Boolean       | false   | 是否禁用.   |
| title   | String        | -       | 标题.       |
| name    | String Number | -       | 唯一标识.   |
