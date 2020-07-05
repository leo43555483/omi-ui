# OmiSwipeAction

## 安装

```js
import { SwipeAction } from 'omiui';
//or
import { SwipeAction } from 'omiui';
Vue.use(SwipeAction);
```

## 使用

### 基本用法

```html
<omi-swipe-action :autoClose="autoClose">
  <div>swipe-ation</div>
  <template slot="left">
    <div class="custom-action info">info</div>
    <div class="custom-action replay">replay</div>
  </template>
  <template slot="right">
    <div class="custom-action remove">remove</div>
    <div class="custom-action cancel">cancel</div>
  </template>
  <div slot="extra">more</div>
</omi-swipe-action>
<script>
  export default {
    mehtods: {
      methods: {
        autoClose(e, close) {
          this.$dialog.confirm({
            title: '是否关闭',
            cancelText: '取消',
            confirmText: '确认',
            onConfirm() {
              console.log('onConfrim');
              close();
            },
          });
        },
      },
    },
  };
</script>
```

## Props

| name      | type             | default | description                                                                                                          |
| --------- | ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| text      | String           | -       | 按钮中的文案.                                                                                                        |
| showArrow | Boolean          | true    | 是否显示右侧箭头.                                                                                                    |
| threshold | Number           | 0.5     | 控制手指释放按钮后触发打开或关闭的按钮的阈值,以当前宽度为准，当移动距离超过*width \* threshold*时触发打开或关闭操作. |
| autoClose | Function Boolean | false   | 是否在点击按钮后自动关闭.                                                                                            |

## Methods

| name  | params | return | description |
| ----- | ------ | ------ | ----------- |
| close |        | -      |             |

## Events

| name  | params | description |
| ----- | ------ | ----------- |
| click | -      | -           |

## Slots

| name    | description   |
| ------- | ------------- |
| default |               |
| left    | 左侧操作区域. |
| right   | 右侧操作区域. |
| extra   |               |
