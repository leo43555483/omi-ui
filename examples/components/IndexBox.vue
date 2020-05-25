<template>
  <div class="demo-index-box">
    <omi-index-box>
      <div
        v-for="(item) in indexList"
        :key="item.index"
      >
        <omi-index-anchor
          :title="item.title"
          :index="item.index"
        />
        <div class="demo-index-anchor__content">{{item.title}}</div>
      </div>

    </omi-index-box>
  </div>
</template>

<script>
export default {
  name: 'DemoIndexBox',
  data() {
    return {
      indexList: [],
    };
  },
  methods: {
    onSelect(e) {
      console.log(e);
    },
    getIndex(i) {
      const char = 'A'.charCodeAt();
      return String.fromCharCode(char + i);
    },
  },
  mounted() {
    const { getIndex } = this;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 26; i++) {
      this.indexList.push({ title: getIndex(i), index: getIndex(i) });
    }
  },
};
</script>

<style lang="scss">
.demo-index-anchor__content{
  padding: 4px 16px;
}
</style>
