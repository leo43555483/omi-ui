<template>
  <div class="demo-page-preview">
    <omi-button @click="onClick" block>预览</omi-button>
    <omi-image-preview v-model="show" :images="images"></omi-image-preview>
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

<style>

</style>
