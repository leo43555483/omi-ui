# OmiImagePreview

## 安装

```js
import { ImagePreview } from 'omiui';
//or
import { ImagePreview } from 'omiui';
Vue.use(ImagePreview);
```

## 使用

### 基础用法

```html
<template>
  <omi-button @click="onClick" block>预览</omi-button>
  <omi-image-preview
    v-model="show"
    :images="images"
    :onClose="onClose"
    lazy-load
  ></omi-image-preview>
</template>
<script>
  export default {
    name: 'DemoImagePreview',
    data() {
      return {
        show: false,
        images: [
          'https://dpubstatic.udache.com/static/dpubimg/XsZT-Ium9K/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
          'https://dpubstatic.udache.com/static/dpubimg/jM0pARr01R/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg',
        ],
      };
    },
    methods: {
      onClick() {
        this.show = true;
      },
    },
  };
</script>
```

### 函数调用方式使用

```html
<template>
  <omi-image
    class="demo-image__item"
    placeholder-height="180px"
    v-for="(img, index) in images"
    :key="index"
    :src="img"
    @click="() => onClickImg(index)"
  />
</template>
<script>
  export default {
    name: 'DemoImagePreview',
    data() {
      return {
        show: false,
        images: [
          'https://dpubstatic.udache.com/static/dpubimg/XsZT-Ium9K/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
          'https://dpubstatic.udache.com/static/dpubimg/jM0pARr01R/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg',
        ],
      };
    },
    methods: {
      onClickImg(index) {
        this.$imagePreview({
          images: this.images,
          initialIndex: index,
          onClose() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 100);
            });
          },
        });
      },
    },
  };
</script>
```

## Props

| name              | type           | default                        | description                          |
| ----------------- | -------------- | ------------------------------ | ------------------------------------ |
| images            | Array          | []                             | 图片 url.                            |
| value             | Boolean        | false                          |                                      |
| onClose           | Function       | -                              | 关闭前调用. 返回*Promise*则异步关闭. |
| initialIndex      | Number         | 0                              | 显示首张照片的下标.                  |
| overlayClassName  | String         | 'omi-image-preview\_\_overlay' | 遮罩层 className.                    |
| showClose         | Boolean        | false                          | 是否显示关闭按钮.                    |
| placeholderHeight | String, Number | '150px'                        | 图片预览时占位区域高度.              |

该组件内部使用了`<Image />`，此处查看`<Image />` [props 属性]().

## Slots

| name      | description                 |
| --------- | --------------------------- |
| header    | 预览顶部区域插槽.           |
| indicator | 指示器插槽，可自定义指示器. |
