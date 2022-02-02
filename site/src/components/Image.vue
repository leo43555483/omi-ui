<template>
  <div class="img-list">
    <div class="demo-item">
      懒加载
      <omi-image
        class="demo-image__item"
        lazy-load
        placeholder-height="180px"
        v-for="(img, index) in images"
        :key="index"
        :src="img"
      />
    </div>
    <div class="demo-item">
      基础用法
      <omi-image
        class="demo-image__item"
        placeholder-height="180px"
        v-for="(img, index) in images"
        :key="index"
        :src="img"
      />
    </div>
  </div>
</template>

<script>
import { Image } from 'omi'

export default {
  name: 'DemoImage',
  data () {
    return {
      images: [
        'https://dpubstatic.udache.com/static/dpubimg/XsZT-Ium9K/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
        'https://dpubstatic.udache.com/static/dpubimg/jM0pARr01R/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg'
      ]
    }
  },
  components: {
    [Image.name]: Image
  }
}
</script>

<style>

</style>
