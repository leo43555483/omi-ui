# OmiToast

## 安装

```js
import { Toast } from 'omiui';
//or
import { Toast } from 'omiui';
Vue.use(Toast);
```

## 使用

### 基础用法

```html
<template>
  <omi-button @click="onClick">success</omi-button>
</template>
<script>
  export default {
    methods: {
      onClick(type) {
        this.$toast('success');
      },
    },
  };
</script>
```

### 指定类型

```html
<template>
  <omi-button @click="() => onClick('success')">success</omi-button>
  <omi-button @click="close">关闭</omi-button>
</template>
<script>
  export default {
    methods: {
      onClick(type) {
        this.toast = this.$toast[type]({
          // content: '....',
          // icon: 'mail',
          onClose: () => {
            console.log(`close ${type}`);
          },
          onOpen: () => {
            console.log(`open ${type}`);
          },
        });
      },
      close() {
        //多例模式关闭所有弹出toast
        //this.$toast.closeAll();

        this.$toast.close();
      }
    },
  };
</script>
```

### 预设

```js
import { Toast } from 'omiui';

//使用多例
//Toast.single(false);

Toast.setOptions('loading', {
  durations: 500,
  clickClose: false,
});
//or
Toast.setOptions({
  durations: 500,
  clickClose: false,
});

```

### 自定义 html

```html
<template>
  <omi-button @click="onOpenHtml">html</omi-button>
</template>
<script>
  export default {
    methods: {
      onOpenHtml() {
        this.toast = this.$toast({
          type: 'html',
          content: '<div>html</div>',
        });
      },
    },
  };
</script>
```

## Options

| name       | type    | default | description                                                  |
| ---------- | ------- | ------- | ------------------------------------------------------------ |
| clickClose | Boolean | false   | 是否点击后关闭.                                              |
| noScroll   | Boolean | true    | toast 弹出后是否允许页面滚动.                                |
| icon       | String  |         | 需要显示的 icon，详情请看[icon]().                           |
| content    | String  |         | 内容文案.                                                    |
| baseZindex | Number  | 2000    | z-index.                                                     |
| type       | String  | 'text'  | 类型，可选值['success', 'loading', 'error', 'text', 'html']. |
| durations  | Number  | 2000    | duration 毫秒后自动关闭.                                     |

## Events

| name  | params | description |
| ----- | ------ | ----------- |
| input | value  |             |

## Methods

| name       | params                        | description                                                                       |
| ---------- | ----------------------------- | --------------------------------------------------------------------------------- |
| single     | isSingle: Boolean             | 是否单例模式，默认为 true.                                                        |
| setOptions | type?: String<br>option: Object | 预设.                                                                             |
| close      |                               | 单例模式则关闭当前 toast，多例模式则关闭队列中第一个 toast（即最先打开的 toast）. |
| closeAll   |                               | 关闭所有.                                                                         |
