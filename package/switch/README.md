# OmiSwitch

## 安装

```js
import { Switch } from 'omiui';
//or
import { Switch } from 'omiui';
Vue.use(Switch);
```

## 使用

### 基础用法

```html
<omi-switch v-model="checked"></omi-switch>
```

### 自定义颜色

```html
<omi-switch v-model="checked" activeColor="red"></omi-switch>
```

### 禁用

```html
<omi-switch v-model="checked5" disable></omi-switch>
```

### 回调控制

```html
<omi-switch :value="checked" @input="onSwitch" :loading="loading"></omi-switch>
<script>
  export default {
    data() {
      return {
        checked: false,
        loading: false,
      };
    },
    methods: {
      onSwitch(checked) {
        if (checked) {
          this.checked = checked;
          return;
        }
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.checked = checked;
        }, 1000);
      },
    },
  };
</script>
```

## Props

| name        | type    | default | description         |
| ----------- | ------- | ------- | ------------------- |
| size        | Number  | -       | 图标尺寸.           |
| value       | Boolean | false   | 是否激活当前.       |
| activeColor | String  | -       | 激活状态的颜色.     |
| loading     | Boolean | false   | 是否显示加载状态.   |
| loadingSize | Number  | 12      | 加载状态 icon 尺寸. |
| disable     | Boolean | false   | 是否禁用.           |

## Events

| name  | params | description |
| ----- | ------ | ----------- |
| input | -      | -           |
