<template>
  <div class="demo-search">
    <form action="#" class="demo-search__form">
      <omi-search placeholder="搜索" v-model="search"></omi-search>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DemoSearch',
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style lang="scss">
.demo-search__form{
  padding: 4px 16px;
}
</style>
