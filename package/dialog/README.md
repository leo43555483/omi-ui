# OmiDialog

## 安装

```js
import { Dialog } from 'omiui';
//or
import { Dialog } from 'omiui';
Vue.use(Dialog);
```

## 使用

### 基础用法

```html
<template>
  <omi-button block @click="onClick">基本用法</omi-button>
</template>
<script>
  export default {
    methods: {
      onClick() {
        this.$dialog({
          title: 'dialog',
          content: '我是一个dialog,哈哈哈',
          cancelText: '取消',
          confirmText: '确认',
        });
      },
    },
  };
</script>
```

### 异步确认

```html
<template>
  <omi-button block @click="onClick">异步确认</omi-button>
</template>
<script>
  export default {
    methods: {
      onClick(type) {
        this.$dialog.confirm({
          title: 'dialog',
          content: '我是一个dialog,哈哈哈',
          cancelText: '取消',
          confirmText: '确认',
          onConfirm: () => {
            const loading = this.$toast.loading();
            return new Promise(r => {
              setTimeout(() => {
                r();
                loading.close();
              }, 2000);
            });
          },
        });
      },
    },
  };
</script>
```

### prompt

```html
<template>
  <omi-button @click="onClick">prompt</omi-button>
</template>
<script>
  export default {
    methods: {
      onClick() {
        this.$dialog.prompt({
          title: 'promp',
          cancelText: '取消',
          confirmText: '确认',
          prompt: {
            placeholder: '请输入电子邮箱',
            value: '',
            rules: [
              {
                type: 'email',
                required: true,
                message: '请输入邮箱地址',
                trigger: 'change',
              },
            ],
          },
          onConfirm: (err, value) =>
            new Promise(r => {
              if (err) return;
              r();
            }),
        });
      },
    },
  };
</script>
```

## Options

| name        | type    | default | description                                 |
| ----------- | ------- | ------- | ------------------------------------------- |
| clickClose  | Boolean | false   | 是否点击后关闭.                             |
| title       | String  |         | 标题.                                       |
| content     | String  |         | 内容文案.                                   |
| type        | String  | 'text'  | 类型，可选值['alert', 'confirm', 'prompt']. |
| cancelText  | String  |         | 取消按钮文案，若未设置则不会显示.           |
| confirmText | String  |         | 确认按钮文案，若未设置则不会显示.           |

## Methods

| name    | params                                           | description |
| ------- | ------------------------------------------------ | ----------- |
| alert   | title: String,Object <br> content: String,Object |             |
| prompt  | title: String,Object <br> content: String,Object |             |
| confirm | title: String,Object <br> content: String,Object |             |
