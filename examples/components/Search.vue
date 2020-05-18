<template>
  <div class="demo-search">
    <form action="#" class="demo-search__form">
      <omi-search placeholder="搜索" v-model="search" cancelText="取消"></omi-search>
    </form>
    <form action="#" class="demo-search__form">
      <omi-search placeholder="搜索" v-model="search2" cancelText="取消" fixedCancel></omi-search>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DemoSearch',
  data() {
    return {
      search: '1',
      search2: '',
    };
  },
};
</script>

<style lang="scss">
.demo-search__form{
  padding: 4px 16px;
}
</style>
