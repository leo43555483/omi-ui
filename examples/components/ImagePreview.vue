<template>
  <div class="demo-page-preview">
    <div class="demo-item">
      <omi-button @click="onClick" block>预览</omi-button>
    </div>
    <omi-image-preview v-model="show" :images="images"></omi-image-preview>
    <div class="demo-item img-list">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        @click="() => onClickImg(index)"
      >
    </div>
  </div>
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
      });
    },
    onClick() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss">
.img-list{
  display: flex;
  flex-direction: column;
  img {
    max-width: 100%;
  }
}
</style>
