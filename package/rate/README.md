# OmiRate

## 安装

```js
import { Rate } from 'omiui';
//or
import { Rate } from 'omiui';
Vue.use(Rate);
```

## 使用

### 基础用法

```html
<omi-rate v-model="rate" />
<script>
  export default {
    data() {
      rate: 3;
    },
  };
</script>
```

### 半星

```html
<omi-rate v-model="rate" halfRate />
<script>
  export default {
    data() {
      rate: 3;
    },
  };
</script>
```

## Props

| name      | type    | default | description   |
| --------- | ------- | ------- | ------------- |
| voidColor | String  | #ddd    | 空状态颜色.   |
| fillColor | String  | #ffbb2a | 选中状态颜色. |
| size      | Number  | 24      | icon 尺寸.    |
| total     | Number  | 5       | 总个数.       |
| score     | Number  | 0       | 当前值.       |
| readonly  | Boolean | false   | 是否只读.     |
| halfRate  | Boolean | false   | 是否可选半星. |

## Event

| name   | params | description |
| ------ | ------ | ----------- |
| input  | score  | -           |
| change | score  | -           |
